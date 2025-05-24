"use client";

import type { EvBunk } from '@/lib/types';
import Image from 'next/image';
import { MapView } from '@/components/map/map-view';
import { SlotStatusIndicator } from './slot-status-indicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Zap, Info, ShieldCheck, Star, Users } from 'lucide-react'; // Added Star, Users
import Link from 'next/link';

interface BunkDetailsProps {
  bunk: EvBunk;
}

export function BunkDetails({ bunk }: BunkDetailsProps) {
  const getDirectionsLink = (lat: number, lng: number, address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodedAddress}`;
  };

  return (
    <div className="space-y-8">
      {bunk.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg border">
          <Image
            src={bunk.imageUrl}
            alt={bunk.name}
            layout="fill"
            objectFit="cover"
            priority // Prioritize loading image for LCP
            data-ai-hint="electric vehicle charging"
          />
        </div>
      )}

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">{bunk.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">Information</h3>
            <p className="flex items-start">
              <MapPin className="mr-3 h-5 w-5 text-accent flex-shrink-0 mt-1" />
              <span>{bunk.address}</span>
            </p>
            <p className="flex items-center">
              <Phone className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
              <a href={`tel:${bunk.phone}`} className="text-primary hover:underline">{bunk.phone}</a>
            </p>
            {bunk.operatingHours && (
              <p className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
                <span>{bunk.operatingHours}</span>
              </p>
            )}
            {bunk.amenities && bunk.amenities.length > 0 && (
              <div className="flex items-start">
                <ShieldCheck className="mr-3 h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <span className="font-medium">Amenities:</span>
                  <ul className="list-disc list-inside ml-1">
                    {bunk.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
                  </ul>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <Star className="mr-3 h-5 w-5 text-yellow-500 flex-shrink-0" /> Rating: {bunk.rating.toFixed(1)}
            </div>
            <div className="flex items-center">
              <Users className="mr-3 h-5 w-5 text-blue-500 flex-shrink-0" /> Popularity: {bunk.popularity}%
            </div>

            <Button asChild size="lg" className="mt-4 w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={getDirectionsLink(bunk.coordinates.lat, bunk.coordinates.lng, bunk.address)} target="_blank" rel="noopener noreferrer">
                Get Directions
              </Link>
            </Button>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-secondary-foreground mb-3">Charging Slots</h3>
            {bunk.slots.length > 0 ? (
              <div className="space-y-3">
                {bunk.slots.map(slot => (
                  <SlotStatusIndicator key={slot.id} slot={slot} size="md" />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No slot information available.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-xl font-semibold text-secondary-foreground mb-3">Location on Map</h3>
         <MapView bunks={[bunk]} defaultCenter={bunk.coordinates} defaultZoom={15} selectedBunkId={bunk.id} className="h-[300px] md:h-[400px]" />
      </div>

    </div>
  );
}
