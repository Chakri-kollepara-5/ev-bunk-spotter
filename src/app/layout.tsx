import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EV Bunk Spotter',
  description: 'Locate, check availability, and book EV recharge bunks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <AuthProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
            {/* Optional Footer can be added here */}
            {/* <footer className="bg-secondary text-secondary-foreground p-4 text-center">
              © {new Date().getFullYear()} EV Bunk Spotter
            </footer> */}
          </AuthProvider>
        </APIProvider>
      </body>
    </html>
  );
}
