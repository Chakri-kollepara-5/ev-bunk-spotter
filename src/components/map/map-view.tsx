"use client";

import { cn } from '@/lib/utils';
// EvBunk type might still be imported if other parts of the file expect it,
// but it's not directly used by the placeholder.
// import type { EvBunk } from '@/lib/types'; 
// useRouter is not needed for a simple placeholder.
// import { useRouter } from 'next/navigation'; 

interface MapViewProps {
  // Props from the original component are commented out as they are not used by the placeholder
  // bunks?: EvBunk[]; 
  // defaultCenter?: { lat: number; lng: number };
  // defaultZoom?: number;
  // selectedBunkId?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function MapView({ style, className }: MapViewProps) {
  // const router = useRouter(); // Not needed for placeholder

  const mapContainerStyle = style || { width: '100%', height: '400px' }; // Default style

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
          The map functionality is currently disabled. 
          <br />
          To use maps, please ensure a valid Google Maps API key is configured.
        </p>
      </div>
    </div>
  );
}
