'use client';

import { useMemo, useState } from 'react';
import BookRow from './BookRow';
import { PiArrowLeftLight, PiMagnifyingGlassLight } from 'react-icons/pi';
import Dialog from '@/components/layout/Dialog';
import AddBookForm from '@/components/home/AddBookForm';
import Link from 'next/link';
import { useBooks } from '@/services/hooks/useBooks';

function normalizeCategory(value?: string | null): string {
    return value?.trim().replace(/\.+$/, '').toUpperCase() ?? '';
}

type Props = {
    className?: string;
};

export default function AllBooksPage({ className }: Props) {
    const { books, loading, error } = useBooks();

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [open, setOpen] = useState(false);

    const categories = useMemo(() => {
        const set = new Set<string>();
        let hasUncategorized = false;

        books.forEach((book) => {
            const value = normalizeCategory(book.category);
            if (value) {
                set.add(value);
            } else {
                hasUncategorized = true;
            }
        });

        const sorted = Array.from(set).sort((a, b) => a.localeCompare(b));
        return ['All', ...sorted, ...(hasUncategorized ? ['Uncategorized'] : [])];
    }, [books]);

    const filtered = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                (book.authors?.toLowerCase().includes(search.toLowerCase()) ?? false);

            const currentCategory = normalizeCategory(book.category) || 'Uncategorized';
            const matchesCategory =
                categoryFilter === 'All' || currentCategory === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [books, search, categoryFilter]);

    function handleAddBook(_data: { title: string; author: string }) {
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
                        className="flex place-items-center gap-2 cursor-pointer whitespace-nowrap transition-transform duration-200 ease-out hover:scale-105 active:scale-95 text-light-text2 hover:text-light-purple text-sm"
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
                        aria-label="Search books"
                    />
                    <span className="text-light-tag3t shrink-0" aria-hidden="true">
                        <PiMagnifyingGlassLight />
                    </span>
                </div>

                <div className="flex flex-wrap content-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setCategoryFilter(category)}
                            className={
                                'py-1 px-2 rounded-lg text-sm transition-colors whitespace-nowrap uppercase' +
                                (categoryFilter === category
                                    ? ' bg-light-bgActive text-light-bg1'
                                    : ' bg-light-bg3 hover:bg-light-bg1')
                            }
                        >
                            {category}
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
                            <th className="text-center">Category</th>
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