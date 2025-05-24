
"use client";

import type { EvBunk } from '@/lib/types';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Using next/image for optimized images
import { cn } from '@/lib/utils';

interface MapViewProps {
  bunks: EvBunk[];
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  selectedBunkId?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function MapView({
  bunks,
  defaultCenter = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  defaultZoom = 5, // Zoom out to see multiple cities if bunks are spread out
  selectedBunkId,
  style,
  className,
}: MapViewProps) {
  const router = useRouter();

  const handleMarkerClick = (bunkId: string) => {
    router.push(`/bunks/${bunkId}`);
  };

  const mapContainerStyle = style || { width: '100%', height: '500px' };

  if (!bunks || bunks.length === 0) {
    return (
      <div className={cn("flex items-center justify-center rounded-lg border bg-muted text-muted-foreground", className)} style={mapContainerStyle}>
        <p>No bunk locations to display on the map.</p>
      </div>
    );
  }
  
  // If only one bunk or a selected bunk, center on it
  const center = bunks.length === 1 ? bunks[0].coordinates : defaultCenter;
  const zoom = bunks.length === 1 ? 14 : defaultZoom;


  return (
    <div className={cn("rounded-lg overflow-hidden shadow-lg border", className)} style={mapContainerStyle}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        mapId="evBunkSpotterMap" // Optional: for advanced map styling
        gestureHandling="greedy" // Allows map interaction without ctrl/cmd key
        disableDefaultUI={false}
      >
        {bunks.map((bunk) => (
          <AdvancedMarker
            key={bunk.id}
            position={bunk.coordinates}
            onClick={() => handleMarkerClick(bunk.id)}
            title={bunk.name}
          >
            {/* Using an img tag directly as per the example for custom HTML markers */}
            {/* Using a standard img tag as AdvancedMarker can render any HTML. next/image might have issues with direct rendering here depending on context. */}
            <img
              className="flag-icon"
              src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              alt={`Marker for ${bunk.name}`}
              width="32" // Example width, adjust as needed
              height="32" // Example height, adjust as needed
              style={{ cursor: 'pointer' }}
            />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}
