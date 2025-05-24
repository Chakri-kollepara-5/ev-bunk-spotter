// Google Maps API Key configuration
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";

if (GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE" && process.env.NODE_ENV !== 'test') {
  console.warn(
    "Warning: Google Maps API key is not configured. Map functionality will be limited or broken. " +
    "Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file or directly in src/lib/config.ts."
  );
}
