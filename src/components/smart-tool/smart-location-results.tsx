import type { AISuggestion } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Assuming we might link to a bunk if we can match it
import { MapPin, Zap, Star, Users, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface SmartLocationResultsProps {
  recommendations: AISuggestion[];
}

export function SmartLocationResults({ recommendations }: SmartLocationResultsProps) {
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-muted-foreground mt-4">No recommendations to display. Try adjusting your search criteria.</p>;
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-semibold">Recommended EV Bunks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
               {rec.imageUrl && (
                <div className="relative w-full h-40 mb-3 rounded-t-md overflow-hidden">
                  <Image
                    src={rec.imageUrl}
                    alt={rec.bunkName}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="charging location modern"
                  />
                </div>
              )}
              <CardTitle className="text-lg font-semibold text-primary">{rec.bunkName}</CardTitle>
              <CardDescription className="flex items-center text-xs text-muted-foreground">
                <MapPin className="mr-2 h-3 w-3" /> {rec.address}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm">
              <p className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-accent" /> Availability: {rec.availability}
              </p>
              <p className="flex items-center">
                <Star className="mr-2 h-4 w-4 text-yellow-500" /> Rating: {rec.rating.toFixed(1)}
              </p>
              <p className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-blue-500" /> Popularity: {rec.popularity}%
              </p>
            </CardContent>
            {/* If we had a way to link to specific bunks based on name/address:
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/bunks/find?name=${encodeURIComponent(rec.bunkName)}`}>
                  View Details <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
            */}
          </Card>
        ))}
      </div>
    </div>
  );
}
