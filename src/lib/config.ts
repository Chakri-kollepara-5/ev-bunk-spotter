// Google Maps API Key configuration
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyD96t9iJssAKWlqNKev7LT1tioflNdIhPI";

if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && process.env.NODE_ENV !== 'test') {
  console.warn(
    "Warning: Google Maps API key is currently hardcoded in src/lib/config.ts. " +
    "For better security and flexibility, especially for production, " +
    "it is recommended to set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable (e.g., in a .env.local file)."
  );
} else if (GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE" && process.env.NODE_ENV !== 'test') {
  // This case remains if the user clears the hardcoded key back to the placeholder
  // and also doesn't have an environment variable set.
   console.warn(
    "Warning: Google Maps API key is not configured. Map functionality will be limited or broken. " +
    "Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file or directly in src/lib/config.ts."
  );
}
