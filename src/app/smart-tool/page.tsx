"use client";

import { useState } from 'react';
import { SmartLocationForm } from '@/components/smart-tool/smart-location-form';
import type { SmartLocationFormValues } from '@/components/smart-tool/smart-location-form';
import { SmartLocationResults } from '@/components/smart-tool/smart-location-results';
import type { AISuggestion } from '@/lib/types';
import { recommendEvBunks, RecommendEvBunksInput } from '@/ai/flows/smart-location-tool';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { mockBunks } from '@/lib/mock-data'; // For placeholder images

export default function SmartToolPage() {
  const [recommendations, setRecommendations] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (values: SmartLocationFormValues) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    const input: RecommendEvBunksInput = {
      userLocation: values.userLocation,
      searchRadius: values.searchRadius,
      numberOfRecommendations: values.numberOfRecommendations,
    };

    try {
      // The AI flow might be a server action. Ensure it's set up correctly.
      // If `recommendEvBunks` is not a server action, this client-side call will fail during build or runtime.
      // For now, assuming `recommendEvBunks` from `ai/flows` is callable.
      const result = await recommendEvBunks(input);
      
      // Add placeholder images to recommendations
      const recommendationsWithImages = result.recommendations.map((rec, index) => ({
        ...rec,
        // Cycle through mock bunk images or use a generic placeholder
        imageUrl: mockBunks[index % mockBunks.length]?.imageUrl || `https://placehold.co/600x400.png`, 
      }));

      setRecommendations(recommendationsWithImages);
      if (recommendationsWithImages.length === 0) {
        toast({ title: "No Results", description: "The AI couldn't find any recommendations based on your criteria." });
      } else {
        toast({ title: "Recommendations Found", description: `Found ${recommendationsWithImages.length} EV bunks for you.` });
      }
    } catch (e: any) {
      console.error("Error getting recommendations:", e);
      setError(e.message || "Failed to fetch recommendations.");
      toast({ title: "Error", description: e.message || "Failed to fetch recommendations.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-primary mb-2">Smart Location Tool</h1>
        <p className="text-muted-foreground mb-6">
          Let our AI find the best EV charging bunks for you based on popularity, availability, and ratings.
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
      
      {!isLoading && !error && recommendations.length === 0 && !error && (
        // Initial state or no results found message handled by form/toast
        <></>
      )}
    </div>
  );
}
