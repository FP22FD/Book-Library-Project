'use client';

import { useMemo, useState, useEffect } from 'react';
import BookRow from './BookRow';
import { PiArrowLeftLight, PiMagnifyingGlassLight } from 'react-icons/pi';
import Dialog from '@/components/layout/Dialog';
import AddBookForm from '@/components/home/AddBookForm';
import Link from 'next/link';
import type { Book } from './types/book';

type Genre = {
    name: string;
    count: number;
};

const genres: Genre[] = [
    { name: 'Fiction', count: 2 },
    { name: 'Mystery', count: 4 },
    { name: 'Biography', count: 6 },
    { name: 'History', count: 3 },
    { name: 'Philosophy', count: 5 },
    { name: 'Poetry', count: 8 },
    { name: 'Fantasy', count: 1 },
];

type Props = {
    className?: string;
};

export default function AllBooksPage({ className }: Props) {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState('');
    const [genreFilter, setGenreFilter] = useState('All');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch books from real API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://localhost:7263/api/books');
                if (!response.ok) throw new Error(`Failed to fetch books: ${response.status}`);
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

    const filtered = useMemo(() => {
        return books.filter(
            (book) =>
                (book.title.toLowerCase().includes(search.toLowerCase()) ||
                    (book.authors?.toLowerCase().includes(search.toLowerCase()) ?? false)) &&
                (genreFilter === 'All' /*|| book.genre === genreFilter*/),
        );
    }, [books, search, genreFilter]);

    function handleAddBook(data: { title: string; author: string }) {
        // TODO: Integrate with server in future (POST request)
        setOpen(false);
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <section className={`flex flex-col text-base ${className ?? ''}`}>
            <div className={`flex justify-between mb-8 align-middle pb-8 ${className ?? ''}`}>
                <div>
                    <h1 className="text-3xl font-bold">All Books</h1>
                    <Link
                        href="/"
                        className="flex place-items-center gap-2 cursor-pointer whitespace-nowrap transition-transform duration-200 ease-out hover:scale-105 active:scale-95 text-light-text2 hover:text-light-purple"
                    >
                        <PiArrowLeftLight />
                        <span>Back to home</span>
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Add Book"
                    className="bg-light-text0 hover:bg-light-accentBorder hover:text-light-purple text-light-bg1 font-bold px-4 rounded h-8 text-sm"
                    onClick={() => setOpen(true)}
                >
                    + Add Book
                </button>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <h2 className="text-xl font-bold mb-4">Add a new book</h2>
                    <AddBookForm onSubmit={handleAddBook} onCancel={() => setOpen(false)} />
                </Dialog>
            </div>

            {/* Search and Filter */}
            <p className="mt-1 text-light-text2 text-sm place-self-end mr-2">
                <span className="font-semibold mr-1 text-light-text0">{filtered.length}</span>
                of {books.length} books
            </p>

            <div className="flex mb-8 items-center rounded-lg gap-6 border px-4 pt-4 pb-12 bg-light-bg1">
                <div className="flex items-center gap-2 bg-light-bg2 border border-light-border rounded-lg py-[7px] px-4 w-[min(280px,40vw)] cursor-text transition-all duration-200 hover:shadow-sm hover:border-light-borderSoft focus-within:shadow-md focus-within:border-light-tag1t">
                    <input
                        type="text"
                        placeholder="Search books…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm transition-colors duration-200"
                        aria-label="Search"
                    />
                    <span className="text-light-tag3t shrink-0 cursor-pointer">
                        <PiMagnifyingGlassLight />
                    </span>
                </div>

                <div className="flex content-center space-x-4">
                    <button
                        type="button"
                        onClick={() => setGenreFilter('All')}
                        className={`py-1 px-2 rounded-lg text-sm transition-colors ${genreFilter === 'All' ? 'bg-light-bgActive text-light-bg1' : 'bg-light-bg3'
                            }`}
                    >
                        All
                    </button>
                    {genres.map((genre) => (
                        <button
                            key={genre.name}
                            type="button"
                            onClick={() => setGenreFilter(genre.name)}
                            className={`py-1 px-2 rounded-lg text-sm transition-colors whitespace-nowrap ${genreFilter === genre.name
                                ? 'bg-light-bgActive text-light-bg1'
                                : 'bg-light-bg3 transition-colors hover:bg-light-bg1'
                                }`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Books Table */}
            <div className="rounded-lg overflow-hidden border bg-light-bg1">
                <table className="w-full text-left border">
                    <thead className="text-light-text2 text-xs text-muted-foreground bg-light-bg2">
                        <tr>
                            <th className="py-2 px-4">Title</th>
                            <th className="text-center">Genre</th>
                            <th className="text-center">Rating</th>
                            <th className="text-center">Pages</th>
                            <th className="text-center">Year</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent">
                        {filtered.map((book) => (
                            <BookRow key={book.bookId} book={book} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}