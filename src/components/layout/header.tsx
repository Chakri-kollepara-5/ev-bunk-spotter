
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { LogIn, LogOut, UserPlus, MapPin, Lightbulb, Wind } from 'lucide-react';
import { ClientOnly } from './client-only'; // Import the new component

export function Header() {
  const { user, loading, signOutUser } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold shrink-0">
          <Wind className="h-7 w-7 text-accent" />
          <ClientOnly>
            <span className="hidden sm:inline">EV Bunk Spotter</span>
          </ClientOnly>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
              <MapPin className="h-5 w-5 sm:mr-2" />
              <ClientOnly>
                <span className="hidden sm:inline">Home</span>
              </ClientOnly>
            </Button>
          </Link>
          <Link href="/smart-tool" passHref>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
              <Lightbulb className="h-5 w-5 sm:mr-2" />
              <ClientOnly>
                <span className="hidden sm:inline">Smart Tool</span>
              </ClientOnly>
            </Button>
          </Link>
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-primary/50" />
          ) : user ? (
            <>
              <ClientOnly>
                <span className="text-sm hidden md:inline">
                  Welcome, {user.email?.split('@')[0] || 'User'}
                </span>
              </ClientOnly>
              <Button variant="ghost" onClick={signOutUser} className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
                <LogOut className="h-5 w-5 sm:mr-2" />
                <ClientOnly>
                  <span className="hidden sm:inline">Logout</span>
                </ClientOnly>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
                  <LogIn className="h-5 w-5 sm:mr-2" />
                  <ClientOnly>
                    <span className="hidden sm:inline">Login</span>
                  </ClientOnly>
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 px-2 sm:px-3">
                  <UserPlus className="h-5 w-5 sm:mr-2" />
                  <ClientOnly>
                    <span className="hidden sm:inline">Register</span>
                  </ClientOnly>
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
