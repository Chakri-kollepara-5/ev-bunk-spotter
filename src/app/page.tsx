import { MapView } from '@/components/map/map-view';
import { BunkCard } from '@/components/bunk/bunk-card';
import { mockBunks } from '@/lib/mock-data'; // Using mock data for now
import type { EvBunk } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// In a real app, this would be fetched from a database/API
async function getBunks(): Promise<EvBunk[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBunks;
}

export default async function HomePage() {
  const bunks = await getBunks();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-primary mb-2">Find Your Charge</h1>
        <p className="text-muted-foreground mb-6">
          Explore EV charging bunks near you. Click on a marker or card for more details.
        </p>
        {bunks.length > 0 ? (
          <MapView bunks={bunks} className="h-[400px] md:h-[500px]" />
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>No Bunks Found</AlertTitle>
            <AlertDescription>
              We couldn&apos;t find any EV bunks at the moment. Please check back later.
            </AlertDescription>
          </Alert>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Charging Stations</h2>
        {bunks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bunks.map((bunk) => (
              <BunkCard key={bunk.id} bunk={bunk} />
            ))}
          </div>
        ) : (
           <p className="text-muted-foreground">No charging stations available to display.</p>
        )}
      </section>
    </div>
  );
}

// Force dynamic rendering if data fetching is involved, or for auth checks that affect page content.
// export const dynamic = 'force-dynamic'; // Use if data changes frequently or based on user.
