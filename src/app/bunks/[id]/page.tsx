
import { BunkDetails } from '@/components/bunk/bunk-details';
import { mockBunks } from '@/lib/mock-data';
import type { EvBunk } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface BunkPageProps {
  params: { id: string };
}

// Data is sourced directly from mockBunks
async function getBunkById(id: string): Promise<EvBunk | undefined> {
  return mockBunks.find(bunk => bunk.id === id);
}

export async function generateMetadata({ params }: BunkPageProps) {
  const bunk = await getBunkById(params.id);
  if (!bunk) {
    return { title: 'Bunk Not Found' };
  }
  return {
    title: `${bunk.name} - EV Bunk Spotter`,
    description: `Details for ${bunk.name}: ${bunk.address}`,
  };
}

export default async function BunkPage({ params }: BunkPageProps) {
  const bunk = await getBunkById(params.id);

  if (!bunk) {
    return (
      <div className="text-center py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Bunk Not Found</AlertTitle>
          <AlertDescription>
            The EV bunk you are looking for does not exist or could not be found.
          </AlertDescription>
        </Alert>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Link>
      </Button>
      <BunkDetails bunk={bunk} />
    </div>
  );
}

// Optional: Generate static paths if you have a known, limited set of bunks
// export async function generateStaticParams() {
//   return mockBunks.map(bunk => ({ id: bunk.id }));
// }
