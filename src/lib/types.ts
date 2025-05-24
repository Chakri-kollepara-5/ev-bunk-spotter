export interface Slot {
  id: string;
  name: string; // e.g., "Slot A1"
  status: 'available' | 'occupied' | 'maintenance'; // 'maintenance' can be an addition
  type?: 'AC Fast' | 'DC Fast' | 'Level 2'; // Optional: type of charger
  power?: string; // Optional: e.g., "50kW", "7kW"
}

export interface EvBunk {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  slots: Slot[];
  operatingHours?: string; // e.g., "24/7" or "9 AM - 9 PM"
  amenities?: string[]; // e.g., ["WiFi", "Restroom", "Cafe"]
  rating: number; // Average user rating
  popularity: number; // A score indicating popularity
  imageUrl?: string;
}

// For AI tool output, mirroring the schema from smart-location-tool.ts
export interface AISuggestion {
  bunkName: string;
  address: string;
  availability: string; // This might need parsing or could be a summary
  rating: number;
  popularity: number;
  // Potentially add coordinates if the AI can provide them or if we match them locally
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
}
