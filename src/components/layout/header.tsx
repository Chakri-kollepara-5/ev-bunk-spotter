
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { LogIn, LogOut, UserPlus, MapPin, Lightbulb, Wind } from 'lucide-react';
import { useState, useEffect } from 'react'; // Import useState and useEffect

export function Header() {
  const { user, loading, signOutUser } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold shrink-0">
          <Wind className="h-7 w-7 text-accent" />
          {isMounted && <span className="hidden sm:inline">EV Bunk Spotter</span>} {/* Text hidden on xs, shown sm and up, rendered only client-side */}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4"> {/* Adjusted gap for different screen sizes */}
          <Link href="/" passHref>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3"> {/* Adjusted padding */}
              <MapPin className="h-5 w-5 sm:mr-2" /> {/* Margin only on sm+ */}
              {isMounted && <span className="hidden sm:inline">Home</span>} {/* Text hidden on xs, rendered only client-side */}
            </Button>
          </Link>
          <Link href="/smart-tool" passHref>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3"> {/* Adjusted padding */}
              <Lightbulb className="h-5 w-5 sm:mr-2" /> {/* Margin only on sm+ */}
              {isMounted && <span className="hidden sm:inline">Smart Tool</span>} {/* Text hidden on xs, rendered only client-side */}
            </Button>
          </Link>
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-primary/50" />
          ) : user ? (
            <>
              {isMounted && <span className="text-sm hidden md:inline"> {/* Welcome message hidden on xs and sm, rendered only client-side */}
                Welcome, {user.email?.split('@')[0] || 'User'}
              </span>}
              <Button variant="ghost" onClick={signOutUser} className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3"> {/* Adjusted padding */}
                <LogOut className="h-5 w-5 sm:mr-2" /> {/* Margin only on sm+ */}
                {isMounted && <span className="hidden sm:inline">Logout</span>} {/* Text hidden on xs, rendered only client-side */}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3"> {/* Adjusted padding */}
                  <LogIn className="h-5 w-5 sm:mr-2" /> {/* Margin only on sm+ */}
                  {isMounted && <span className="hidden sm:inline">Login</span>} {/* Text hidden on xs, rendered only client-side */}
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 px-2 sm:px-3"> {/* Adjusted padding */}
                  <UserPlus className="h-5 w-5 sm:mr-2" /> {/* Margin only on sm+ */}
                  {isMounted && <span className="hidden sm:inline">Register</span>} {/* Text hidden on xs, rendered only client-side */}
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
