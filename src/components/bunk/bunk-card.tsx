import type { EvBunk } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SlotStatusIndicator } from './slot-status-indicator';
import { MapPin, Phone, Zap, Star, Users } from 'lucide-react';

interface BunkCardProps {
  bunk: EvBunk;
}

export function BunkCard({ bunk }: BunkCardProps) {
  const availableSlots = bunk.slots.filter(slot => slot.status === 'available').length;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        {bunk.imageUrl && (
          <div className="relative w-full h-48 mb-4 rounded-t-md overflow-hidden">
            <Image
              src={bunk.imageUrl}
              alt={bunk.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint="charging station public"
            />
          </div>
        )}
        <CardTitle className="text-xl font-semibold text-primary">{bunk.name}</CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" /> {bunk.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm">
          <Phone className="mr-2 h-4 w-4 text-accent" /> {bunk.phone}
        </div>
        <div className="flex items-center text-sm">
          <Zap className="mr-2 h-4 w-4 text-accent" /> {availableSlots} / {bunk.slots.length} slots available
        </div>
         <div className="flex items-center text-sm">
          <Star className="mr-2 h-4 w-4 text-yellow-500" /> Rating: {bunk.rating.toFixed(1)}
        </div>
        <div className="flex items-center text-sm">
          <Users className="mr-2 h-4 w-4 text-blue-500" /> Popularity: {bunk.popularity}%
        </div>
        {bunk.slots.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-1">Quick Slot View:</h4>
            <div className="flex flex-wrap gap-2">
              {bunk.slots.slice(0, 2).map(slot => ( // Show first 2 slots for brevity
                <SlotStatusIndicator key={slot.id} slot={slot} size="sm" />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/bunks/${bunk.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
