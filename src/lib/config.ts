// IMPORTANT: Replace this with your actual Google Maps API Key
// You can get one from Google Cloud Console: https://console.cloud.google.com/google/maps-apis
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";

if (GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
  console.warn(
    "Warning: Google Maps API key is not configured. Map functionality will be limited or broken. " +
    "Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file or directly in src/lib/config.ts."
  );
}
