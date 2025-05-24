import type { EvBunk } from './types';

export const mockBunks: EvBunk[] = [
  {
    id: 'bunk-1',
    name: 'GreenCharge Central',
    address: '123 Electric Ave, San Francisco, CA 94107',
    phone: '555-0101',
    coordinates: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    slots: [
      { id: 's1-1', name: 'Slot A1', status: 'available', type: 'DC Fast', power: '150kW' },
      { id: 's1-2', name: 'Slot A2', status: 'occupied', type: 'DC Fast', power: '150kW' },
      { id: 's1-3', name: 'Slot B1', status: 'available', type: 'Level 2', power: '7kW' },
      { id: 's1-4', name: 'Slot B2', status: 'maintenance', type: 'Level 2', power: '7kW' },
    ],
    operatingHours: '24/7',
    amenities: ['WiFi', 'Restroom', 'Cafe'],
    rating: 4.5,
    popularity: 85,
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: 'bunk-2',
    name: 'EcoSpark Downtown',
    address: '456 Voltage Rd, Los Angeles, CA 90012',
    phone: '555-0102',
    coordinates: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    slots: [
      { id: 's2-1', name: 'Charger 1', status: 'available', type: 'DC Fast', power: '50kW' },
      { id: 's2-2', name: 'Charger 2', status: 'available', type: 'DC Fast', power: '50kW' },
      { id: 's2-3', name: 'Charger 3', status: 'occupied', type: 'Level 2', power: '11kW' },
    ],
    operatingHours: '6 AM - 11 PM',
    amenities: ['Coffee Shop Nearby'],
    rating: 4.2,
    popularity: 70,
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: 'bunk-3',
    name: 'VoltPoint Eastside',
    address: '789 Ampere St, New York, NY 10001',
    phone: '555-0103',
    coordinates: { lat: 40.7128, lng: -74.0060 }, // New York
    slots: [
      { id: 's3-1', name: 'Station Alpha', status: 'occupied', type: 'AC Fast', power: '22kW' },
      { id: 's3-2', name: 'Station Beta', status: 'available', type: 'AC Fast', power: '22kW' },
    ],
    operatingHours: 'Mon-Fri 8 AM - 8 PM',
    amenities: ['Covered Parking'],
    rating: 3.9,
    popularity: 60,
    imageUrl: 'https://placehold.co/600x400.png',
  },
   {
    id: 'bunk-4',
    name: 'PowerUp Plaza',
    address: '101 Circuit Ln, Chicago, IL 60605',
    phone: '555-0104',
    coordinates: { lat: 41.8781, lng: -87.6298 }, // Chicago
    slots: [
      { id: 's4-1', name: 'P1', status: 'available', type: 'DC Fast', power: '350kW' },
      { id: 's4-2', name: 'P2', status: 'available', type: 'DC Fast', power: '350kW' },
      { id: 's4-3', name: 'P3', status: 'occupied', type: 'Level 2', power: '7kW' },
      { id: 's4-4', name: 'P4', status: 'available', type: 'Level 2', power: '7kW' },
    ],
    operatingHours: '24/7',
    amenities: ['Shopping Mall Access', 'Security Cameras'],
    rating: 4.8,
    popularity: 92,
    imageUrl: 'https://placehold.co/600x400.png',
  },
];
