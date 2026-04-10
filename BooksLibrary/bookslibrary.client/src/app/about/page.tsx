import Link from 'next/link';
import AboutPageHead from './AboutPageHead';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),

  title: 'Book Library | About',
  description:
    'Learn more about the Book Library project, built with Next.js and Tailwind CSS, focused on performance, accessibility, and modern design.',

  openGraph: {
    title: 'Book Library | About',
    description:
      'Learn more about the Book Library project, built with Next.js and Tailwind CSS, focused on performance, accessibility, and modern design.',
    url: 'https://yoursite.com/about',
    siteName: 'Book Library',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Book Library about page',
      },
    ],
  },
};

type Props = {
  className?: string;
};

export default function AboutPage({ className }: Props) {
  return (
    <section
      className={['flex flex-col text-base bg-transparent', className].filter(Boolean).join(' ')}
    >
      <AboutPageHead className="mb-6" />

      <div className="max-w-2xl flex flex-col gap-4 text-light-text2">
        <p className="mb-4 leading-relaxed text-left">
          Welcome! This project is a modern web application built with
          <span className="font-semibold"> Next.js</span> and
          <span className="font-semibold"> Tailwind CSS</span>, designed for a clean, responsive,
          and accessible user experience.
        </p>
        <ul className="mb-4 pl-5 list-disc space-y-1 text-left">
          <li>Latest web technologies</li>
          <li>Responsive design for all devices</li>
          <li>Modular, maintainable codebase</li>
          <li>Focus on accessibility and performance</li>
        </ul>
        <p className="mb-4 text-left">
          Created by <span className="font-semibold">Fernanda</span>, passionate about building
          high-quality digital experiences.
        </p>
        <p>
          Feel free to reach out via the
          <Link href="/contact" className="ml-1 font-semibold hover:text-light-purple">
            Contact page
          </Link>
          !
        </p>
      </div>
    </section>
  );
}
