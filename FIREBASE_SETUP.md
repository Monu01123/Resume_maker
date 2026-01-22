# How to Get Your Firebase API Keys (Step-by-Step)

Follow these exact steps to enable Google Login for your project.

## Phase 1: Create a Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/) and log in with your Google account.
2.  Click **"Create a project"** (or "Add project").
3.  Enter a project name (e.g., `Resume-Intel`) and click **Continue**.
4.  Disable "Google Analytics" (it makes the setup faster) and click **Create project**.
5.  Wait for it to finish and click **Continue**.

## Phase 2: Register the App
1.  On the project dashboard, click the **Web icon (`</>`)** (it looks like a code bracket circle).
2.  **App nickname**: Enter `Resume-Intel-Web`.
3.  Click **"Register app"**.
4.  **COPY THE CONFIG**: You will see a code block with `const firebaseConfig = { ... }`.
    *   Keep this tab open, or copy these values to a notepad. You will need them for Phase 4.
5.  Click **"Continue to console"**.

## Phase 3: Enable Google Login (Crucial!)
1.  On the left sidebar, click **Build** > **Authentication**.
2.  Click **"Get started"**.
3.  Click on the **"Sign-in method"** tab.
4.  Click **"Google"** in the list of providers.
5.  Toggle the **Enable** switch to ON.
6.  **Support email**: Select your own email address from the dropdown.
7.  Click **Save**.

## Phase 4: Add Keys to Your Project
1.  Go back to your VS Code project.
2.  Create a new file named `.env` in the root folder (next to `package.json`).
3.  Paste the values from Phase 2 into this file, matching the format below:

```env
VITE_FIREBASE_API_KEY=paste_apiKey_here
VITE_FIREBASE_AUTH_DOMAIN=paste_authDomain_here
VITE_FIREBASE_PROJECT_ID=paste_projectId_here
VITE_FIREBASE_STORAGE_BUCKET=paste_storageBucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=paste_messagingSenderId_here
VITE_FIREBASE_APP_ID=paste_appId_here
```

**Example:**
If your config says `apiKey: "AIzaSy..."`, your `.env` line should be:
`VITE_FIREBASE_API_KEY=AIzaSy...` (No quotes needed)

## Phase 5: Restart Server
1.  In your terminal, stop the running server (Ctrl+C).
2.  Run `npm run dev` again.
3.  Now "Sign In with Google" will assume the real functionality!
