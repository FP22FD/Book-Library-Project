'use client';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';
//import { Metadata } from 'next';

// Global SEO metadata (applies to all pages unless overridden)
// TODO: Client components (use client) such as RootLayout and AllBooksPage: They cannot have metadata. "use client or use server"
//const metadata: Metadata = {
//  metadataBase: new URL('https://yoursite.com'),

//  title: {
//    default: 'Book Library',
//    template: '%s | Book Library',
//  },

//  description:
//    'Book Library is a modern web application built with Next.js and Tailwind CSS, focused on performance, accessibility, and clean UI.',

//  openGraph: {
//    title: 'Book Library',
//    description: 'Book Library is a modern web application built with Next.js and Tailwind CSS.',
//    url: 'https://yoursite.com',
//    siteName: 'Book Library',
//    locale: 'en_US',
//    type: 'website',
//    images: [
//      {
//        url: '/og-image.png',
//        width: 1200,
//        height: 630,
//        alt: 'Book Library',
//      },
//    ],
//  },

//  icons: {
//    icon: '/favicon.ico',
//  },
//};

// Main container component for the app with grid layout and font styles applied to the body
// This layout will be used across all pages in the app, providing a consistent structure and styling
type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();

  const lightBgRoutes = ['/books'];

  const useLightBg = lightBgRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const mainClass = useLightBg
    ? 'p-6 bg-light-bg0'
    : 'p-6 bg-light-surfaceGlow';



  return (
    <html lang="en">
      {/* Method manually setting the favicon in Next.js */}
      {/* <head>
      <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
      <title>Book Library</title>
      </head> */}
      <body>
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto] grid-cols-[250px_1fr]">
          <Header className="col-span-2" />
          <Sidebar />
          <main className={mainClass}>{children}</main>
          <Footer className="col-span-2" />
        </div>
      </body>
    </html>
  );
}
