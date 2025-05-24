
"use client";

import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { EvBunk } from '@/lib/types';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MapViewProps {
  bunks?: EvBunk[];
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  selectedBunkId?: string;
  style?: React.CSSProperties;
  className?: string;
}

// This is the specific key the user provided and is the current fallback in config.
// It's treated as a potentially non-functional/example key.
const KNOWN_EXAMPLE_API_KEY = "AIzaSyD96t9iJssAKWlqNKev7LT1tioflNdIhPI";

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

  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === KNOWN_EXAMPLE_API_KEY) {
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
            A valid Google Maps API key is required. The current key is either missing or is a non-functional example.
            Please set the <code className="bg-muted-foreground/20 px-1 py-0.5 rounded text-foreground">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable (e.g., in a .env.local file) with your valid key.
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
