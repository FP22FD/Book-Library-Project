import type { Metadata } from 'next';
import ContactPageHead from './ContactPageHead';
import Image from 'next/image'

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),

  title: 'Book Library | Contact',
  description: 'Get in touch for questions, feedback, or collaboration opportunities.',
  openGraph: {
    title: 'Book Library | Contact',
    description: 'Get in touch for questions, feedback, or collaboration opportunities.',
    url: 'https://yoursite.com/contact',
    siteName: 'Book Library',
    locale: 'en_EN',
    type: 'website',
    images: [
      {
        url: 'https://www.booklibrary.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Book Library contact page',
      },
    ],
  },
};

type Props = {
  className?: string;
};

export default function Contact({ className }: Props) {
  return (
    <section
      className={`flex flex-col text-base ${className ?? ''}`}
      aria-labelledby="contact-heading"
    >
      <ContactPageHead className="mb-6" />

      <div className="max-w-2xl text-light-text2">
        <div className="mb-8">
          <p>Feel free to get in touch for questions or feedback.</p>
          <p>I&apos;m always open to collaboration opportunities.</p>
          <p>Whether it&apos;s a project, idea, or suggestion, I&apos;d love to hear it.</p>
          <p>You can reach me through the platforms below.</p>
          <p>I&apos;ll respond as soon as possible.</p>
        </div>

        <div className="not-italic mb-8">
          <ul className=" flex content-center gap-12 text-sm">
            <li className="font-semibold">
              <a
                href="https://www.linkedin.com/in/fernandapereiragomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 text-typography-grey hover:scale-105 hover:text-typography-default border rounded-lg"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="mr-2" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li className="font-semibold">
              <a
                href="https://github.com/FP22FD"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 text-typography-grey hover:scale-105 hover:text-typography-default border rounded-lg"
              >
                <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} className="mr-2" />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>

        <p>Thank you for reaching out!</p>
      </div>
    </section>
  );
}
