"use client";

import type { EvBunk } from '@/lib/types';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';
import { MapPinIcon } from 'lucide-react'; // Using MapPinIcon as a generic marker

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
            <Pin
              background={selectedBunkId === bunk.id ? "var(--primary)" : "var(--accent)"}
              borderColor={selectedBunkId === bunk.id ? "var(--accent-foreground)" : "var(--primary-foreground)"}
              glyphColor={selectedBunkId === bunk.id ? "var(--primary-foreground)" : "var(--accent-foreground)"}
            >
              <MapPinIcon className="h-6 w-6" />
            </Pin>
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}
