"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { LogIn, LogOut, UserPlus, MapPin, Lightbulb, Wind } from 'lucide-react'; // Added Wind as EV Bunk Spotter icon

export function Header() {
  const { user, loading, signOutUser } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Wind className="h-7 w-7 text-accent" />
          <span>EV Bunk Spotter</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80">
              <MapPin className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
          <Link href="/smart-tool" passHref>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80">
              <Lightbulb className="mr-2 h-4 w-4" /> Smart Tool
            </Button>
          </Link>
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-primary/50" />
          ) : user ? (
            <>
              <span className="text-sm hidden sm:inline">Welcome, {user.email?.split('@')[0] || 'User'}</span>
              <Button variant="ghost" onClick={signOutUser} className="text-primary-foreground hover:bg-primary/80">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
