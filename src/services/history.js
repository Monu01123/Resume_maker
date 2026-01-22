import { db } from './firebase'
import { collection, addDoc, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore'

const COLLECTION = 'history'

export const saveAnalysis = async (userId, analysisResult) => {
  if (!userId) return null
  
  try {
    // Add to subcollection: users/{userId}/history
    // Or root collection with userId field. Let's use root collection for simplicity in query.
    // Actually, subcollection is cleaner for privacy rules, but root with index is easier for "collection group" queries later if needed.
    // Let's go with: collection 'history', field 'userId'.
    
    // Clean data before saving (remove undefined)
    const data = JSON.parse(JSON.stringify({
      ...analysisResult,
      userId,
      date: new Date().toISOString()
    }))

    const docRef = await addDoc(collection(db, COLLECTION), data)
    return { ...data, id: docRef.id }
  } catch (error) {
    console.error('Failed to save history to Firestore', error)
    return null
  }
}

export const getHistory = async (userId) => {
  if (!userId) return []

  try {
    const q = query(
      collection(db, COLLECTION),
      where("userId", "==", userId),
      orderBy("date", "desc")
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Failed to fetch history', error)
    return []
  }
}

export const clearHistory = async (userId) => {
  if (!userId) return
  
  try {
    const q = query(collection(db, COLLECTION), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    
    // Batch delete would be better, but loop is fine for small scale
    const promises = querySnapshot.docs.map(d => deleteDoc(doc(db, COLLECTION, d.id)))
    await Promise.all(promises)
  } catch (error) {
     console.error("Failed to clear history", error)
  }
}
