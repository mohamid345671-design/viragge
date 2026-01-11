import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ezzaytouny | Premium Tactical Streetwear',
  description: 'Redefining urban luxury. Premium hoodies, cargo pants, and tactical gear handmade in Morocco. Free shipping & Cash on Delivery.',
  keywords: 'streetwear, morocco, tactical fashion, premium hoodies, cargo pants, strectify, urban clothing',
  openGraph: {
    title: 'ezzaytouny | Premium Tactical Streetwear',
    description: 'Redefining urban luxury. Premium hoodies, cargo pants, and tactical gear.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ezzaytouny',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-white bg-black min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
