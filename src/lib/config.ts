// Google Maps API Key configuration
// The API key provided below is a fallback. For production, use environment variables.
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyD96t9iJssAKWlqNKev7LT1tioflNdIhPI";

const userProvidedHardcodedKey = "AIzaSyD96t9iJssAKWlqNKev7LT1tioflNdIhPI";
const originalPlaceholderKey = "YOUR_GOOGLE_MAPS_API_KEY_HERE"; // Default placeholder before any user input

if (process.env.NODE_ENV !== 'test') {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    // This means the environment variable is not set, so we are using a hardcoded key.
    if (GOOGLE_MAPS_API_KEY === originalPlaceholderKey) {
      // Case: Env var not set, and the fallback is still the original placeholder.
      console.warn(
        "CRITICAL WARNING: Google Maps API key is the default placeholder. Map functionality WILL NOT WORK. " +
        "Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable (e.g., in a .env.local file) " +
        "or update the fallback key in src/lib/config.ts with a valid one."
      );
    } else if (GOOGLE_MAPS_API_KEY === userProvidedHardcodedKey) {
      // Case: Env var not set, and the fallback is the key the user just provided.
      console.warn(
        "Warning: Google Maps API key is currently hardcoded in src/lib/config.ts using the key you provided. " +
        "While this may work for development, for better security and flexibility, especially for production, " +
        "it is strongly recommended to set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable (e.g., in a .env.local file)."
      );
    } else {
      // Case: Env var not set, and the fallback is some other hardcoded key (neither original placeholder nor the one just provided).
       console.warn(
        "Warning: Google Maps API key is currently hardcoded in src/lib/config.ts. " +
        "For better security and flexibility, especially for production, " +
        "it is recommended to set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable."
      );
    }
  }
  // If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set, no warning about hardcoding is needed.
}
