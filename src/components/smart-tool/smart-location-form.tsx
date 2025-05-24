"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // For location input
import { Loader2, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const smartLocationSchema = z.object({
  userLocation: z.string().min(5, { message: "Please enter a valid location (e.g., address, city, or lat,lng)." }),
  searchRadius: z.coerce.number().min(1, { message: "Search radius must be at least 1 km." }).max(100, { message: "Search radius cannot exceed 100 km." }),
  numberOfRecommendations: z.coerce.number().min(1, { message: "Number of recommendations must be at least 1." }).max(10, { message: "Cannot request more than 10 recommendations." }),
});

export type SmartLocationFormValues = z.infer<typeof smartLocationSchema>;

interface SmartLocationFormProps {
  onSubmit: (values: SmartLocationFormValues) => Promise<void>;
  isLoading: boolean;
}

export function SmartLocationForm({ onSubmit, isLoading }: SmartLocationFormProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  const form = useForm<SmartLocationFormValues>({
    resolver: zodResolver(smartLocationSchema),
    defaultValues: {
      userLocation: "",
      searchRadius: 10, // Default 10km
      numberOfRecommendations: 3, // Default 3 recommendations
    },
  });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setValue("userLocation", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, { shouldValidate: true });
          setIsGettingLocation(false);
          toast({ title: "Location Fetched", description: "Current location set." });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({ title: "Location Error", description: "Could not get current location. Please enter manually.", variant: "destructive"});
          setIsGettingLocation(false);
        }
      );
    } else {
      toast({ title: "Location Not Supported", description: "Geolocation is not supported by your browser.", variant: "destructive"});
    }
  };
  
  // Effect to clear location if user starts typing manually after auto-fill
  const userLocationValue = form.watch("userLocation");
  useEffect(() => {
    if (userLocationValue && userLocationValue.match(/^\d+\.\d+, ?-\d+\.\d+$/) && isGettingLocation) {
      // If it's a coordinate pair and we were getting location, do nothing.
    } else if (isGettingLocation) {
      // If user types something else while we were fetching, stop fetching.
      // This condition might need refinement depending on desired UX.
    }
  }, [userLocationValue, isGettingLocation]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Current Location</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                   <Textarea
                    placeholder="e.g., '1600 Amphitheatre Parkway, Mountain View, CA' or '37.422, -122.084'"
                    className="resize-none"
                    {...field}
                  />
                  <Button 
                    type="button" 
                    onClick={handleGetCurrentLocation} 
                    variant="outline"
                    disabled={isGettingLocation || isLoading}
                    aria-label="Get current location"
                    className="shrink-0"
                  >
                    {isGettingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Enter an address, city, or latitude,longitude coordinates.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="searchRadius"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Radius (km)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 10" {...field} />
                </FormControl>
                <FormDescription>
                  How far around your location to search.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfRecommendations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Recommendations</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 3" {...field} />
                </FormControl>
                <FormDescription>
                  How many suggestions you&apos;d like.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto" disabled={isLoading || isGettingLocation}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Get Recommendations
        </Button>
      </form>
    </Form>
  );
}
