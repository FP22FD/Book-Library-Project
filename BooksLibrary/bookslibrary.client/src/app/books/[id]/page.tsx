import { notFound } from 'next/navigation'
import { BookDetailsPage } from '../BookDetailsPage';
import BookDetailPageHead from './BookDetailPageHead';
import { Metadata } from 'next';
import { Book } from '../types/book';

export const metadata: Metadata = {
    metadataBase: new URL('https://yoursite.com'),

    title: 'Book Library | Book Details',
    description:
        'This book will take you on a journey through the life of Kvothe, a gifted musician and magician, as he navigates a world filled with danger, magic, and mystery.',

    openGraph: {
        title: 'Book Library | Book Details',
        description:
            'This book will take you on a journey through the life of Kvothe, a gifted musician and magician, as he navigates a world filled with danger, magic, and mystery.',
        url: 'https://yoursite.com/about',
        siteName: 'Book Library',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Book Library book details page',
            },
        ],
    },
};

//type Book = {
//    bookId: string;
//    title: string;
//    authors: string;
//    createdAtUtc: string;
//};

type Props = {
    params: Promise<{
        id: string;
    }>;
    className?: string;
};

export default async function BookDetails({ params, className }: Props) {
    const { id } = await params;

    const res = await fetch(`https://localhost:7263/api/books/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) return notFound();

    const book: Book = await res.json();
    //const book = await res.json();

    return (
        <section
            className={['flex flex-col text-base p-3', className]
                .filter(Boolean)
                .join(' ')}
        >
            <BookDetailPageHead className="mb-6" />

            <div className="flex flex-col gap-4 text-light-bg">
                <BookDetailsPage {...book} />
            </div>
        </section>
    );
}