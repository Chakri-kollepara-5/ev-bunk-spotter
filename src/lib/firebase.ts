// Firebase has been removed from this project.
// This file is kept to prevent import errors in other files that might still reference it.
// However, all Firebase functionality is now disabled.

console.warn(
  "Warning: Firebase has been removed from this project. " +
  "Authentication and database functionalities will not work."
);

// To re-enable Firebase, you would need to:
// 1. Add Firebase SDKs back to package.json (e.g., 'firebase').
// 2. Restore the Firebase initialization code here with your project config.
// 3. Update src/hooks/use-auth.tsx and other relevant files to use Firebase.

export const app = undefined;
export const auth = undefined;
// export const db = undefined; // If you were using Firestore
