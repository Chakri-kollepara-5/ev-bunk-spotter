"use client";

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { EvBunk } from '@/lib/types';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image'; // Using next/image for optimization if possible, else standard img

interface MapViewProps {
  bunks?: EvBunk[];
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  selectedBunkId?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function MapView({
  bunks = [],
  defaultCenter = { lat: 37.0902, lng: -95.7129 }, // Default to center of US
  defaultZoom = 4,
  selectedBunkId,
  style,
  className,
}: MapViewProps) {
  const router = useRouter();

  const handleMarkerClick = (bunkId: string) => {
    router.push(`/bunks/${bunkId}`);
  };

  const mapContainerStyle = style || { width: '100%', height: '400px' };

  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border bg-muted text-muted-foreground p-4",
          className
        )}
        style={mapContainerStyle}
        role="region"
        aria-label="Map Area Placeholder"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Map Not Available</h3>
          <p className="text-sm text-muted-foreground">
            Google Maps API key is not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
      <div style={mapContainerStyle} className={cn("rounded-lg overflow-hidden border shadow-md", className)}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          mapId="ev_bunk_map_main" 
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          mapTypeId={'roadmap'}
          key={GOOGLE_MAPS_API_KEY} // Add key to re-render map if API key changes
        >
          {bunks.map((bunk) => (
            <AdvancedMarker
              key={bunk.id}
              position={bunk.coordinates}
              onClick={() => handleMarkerClick(bunk.id)}
              title={bunk.name}
            >
              {/* Custom marker content using the flag image */}
              <img
                src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                alt={`${bunk.name} marker`}
                className="flag-icon" // This class is in globals.css
                style={{
                  width: '32px', 
                  height: '32px', 
                }}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
  );
}
