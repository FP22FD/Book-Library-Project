
'use client';

import BookSpine from './BookSpine';
import { PiArrowRightLight } from 'react-icons/pi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Book = {
    bookId: string; 
    title: string;
    createdAtUtc: string;
};

type Props = {
    className?: string;
};

export default function BookShelf({ className }: Props) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                //TODO: change with relative path when deployed /api/books ??
                const response = await fetch('https://localhost:7263/api/books');
                console.log('Fetch response:', response);
                if (!response.ok) {
                    throw new Error(`Failed to fetch books: ${response.status}`);
                }

                const data: Book[] = await response.json();
                setBooks(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className={`bg-light-bg1 border-light-border rounded-xl pt-5 px-5 pb-[18px] mb-5 ${className}`}>
            <div className="bookshelf-head mb-8 flex justify-between">
                <div>
                    <h2 className="font-playfair font-bold text-lg color-light-text0">Your Shelf</h2>
                    <p className="text-light-text2 text-xs mt-1">
                        A visual strip of your active and featured books
                    </p>
                </div>
                <div>
                    <div className="flex place-items-center gap-2 cursor-pointer whitespace-nowrap transition-transform duration-200 ease-out hover:scale-105 active:scale-95 text-light-text2 hover:text-light-purple">
                        <Link href="/books" className="flex items-center">
                            <span className="mr-1 content-center text-sm">View all {books.length} books</span>
                            <PiArrowRightLight />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex items-end gap-1 py-0 px-0 height-[160px] border-b-2 rounded-t-[6px] rounded-b-none overflow-x-auto min-h-4">
                {books.slice(0, 14).map((book, i) => (
                    <div
                        key={`${book.bookId}-${i}`}
                        title={book.title}
                        className="cursor-pointer shrink-0 transition-transform duration-200 ease-out hover:-translate-y-2"
                    >
                        <BookSpine
                            title={book.title}
                            width={22 + (i % 4) * 5}
                            height={108 + (i % 5) * 8}
                            bg="#f5f1e8"
                        />
                    </div>
                ))}
            </div>
            <div className="h-2.5 rounded rounded-b-md rounded-t-none bg-light-gold" />
        </div>
    );
}
