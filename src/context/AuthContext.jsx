import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '@/services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loginWithGoogle() {
    try {
      // Check if API key exists. If not, use Mock Auth immediately.
      if (!import.meta.env.VITE_FIREBASE_API_KEY) {
        console.warn("No Firebase Config found. Using Mock Login.");
        const mockUser = {
          uid: "mock-user-123",
          displayName: "Demo User",
          email: "demo@example.com",
          photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        };
        setCurrentUser(mockUser);
        return mockUser;
      }

      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Firebase Login Failed:", error);
      throw error; // Throw error so Header can show the toast message
    }
  }

  function logout() {
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      setCurrentUser(null);
      return Promise.resolve();
    }
    return signOut(auth).then(() => setCurrentUser(null));
  }

  useEffect(() => {
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
