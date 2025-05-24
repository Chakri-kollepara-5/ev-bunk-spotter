"use client";

import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';

interface MapsApiProviderProps {
  children: ReactNode;
}

export function MapsApiProvider({ children }: MapsApiProviderProps) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      {children}
    </APIProvider>
  );
}
