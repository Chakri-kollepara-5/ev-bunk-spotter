
"use client";

import { useState } from 'react';
import { SmartLocationForm } from '@/components/smart-tool/smart-location-form';
import type { SmartLocationFormValues } from '@/components/smart-tool/smart-location-form';
import { SmartLocationResults } from '@/components/smart-tool/smart-location-results';
import type { AISuggestion, EvBunk } from '@/lib/types'; // Added EvBunk
// Removed: import { recommendEvBunks, RecommendEvBunksInput } from '@/ai/flows/smart-location-tool';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { mockBunks } from '@/lib/mock-data'; // Using mock data

export default function SmartToolPage() {
  const [recommendations, setRecommendations] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Retained for potential future use or other error types
  const { toast } = useToast();

  const handleSubmit = async (values: SmartLocationFormValues) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    // Simulate a brief processing time if desired, or remove for instant results
    await new Promise(resolve => setTimeout(resolve, 100)); 

    try {
      const numRecs = values.numberOfRecommendations;
      
      // Get a subset of mockBunks.
      // The form still has userLocation and searchRadius, but we'll ignore them for this local-only version.
      // We'll just take the first N items based on numberOfRecommendations.
      const localBunks: EvBunk[] = mockBunks.slice(0, numRecs);

      const mappedRecommendations: AISuggestion[] = localBunks.map((bunk) => {
        const availableSlots = bunk.slots.filter(slot => slot.status === 'available').length;
        return {
          bunkName: bunk.name,
          address: bunk.address,
          availability: `${availableSlots} / ${bunk.slots.length} slots available`,
          rating: bunk.rating,
          popularity: bunk.popularity,
          imageUrl: bunk.imageUrl || `https://placehold.co/600x400.png`,
          // coordinates: bunk.coordinates, // Can be added if SmartLocationResults uses it
        };
      });

      setRecommendations(mappedRecommendations);

      if (mappedRecommendations.length === 0) {
        toast({ title: "No Results", description: "No EV bunks found in the local data matching your request." });
      } else {
        toast({ title: "Recommendations Found", description: `Found ${mappedRecommendations.length} EV bunks from local data.` });
      }
    } catch (e: any) {
      // This catch block is less likely to be hit with local data, but kept for robustness
      console.error("Error processing recommendations:", e);
      setError(e.message || "Failed to process recommendations.");
      toast({ title: "Error", description: e.message || "Failed to process recommendations.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-primary mb-2">Smart Location Tool</h1>
        <p className="text-muted-foreground mb-6">
          Find EV charging bunks based on your preferences from our local data.
        </p>
        <SmartLocationForm onSubmit={handleSubmit} isLoading={isLoading} />
      </section>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && !error && <p className="text-center mt-4">Loading recommendations...</p>}
      
      {!isLoading && !error && recommendations.length > 0 && (
         <SmartLocationResults recommendations={recommendations} />
      )}
      
      {!isLoading && !error && recommendations.length === 0 && (
        // Initial state or no results found message handled by toast
        <div className="text-center mt-6 text-muted-foreground">
          <p>Enter your criteria above and click "Get Recommendations" to see available EV bunks from our local list.</p>
        </div>
      )}
    </div>
  );
}
