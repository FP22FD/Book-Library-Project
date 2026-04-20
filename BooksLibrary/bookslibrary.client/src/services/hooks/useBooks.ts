'use client';

import { useEffect, useState } from 'react';
import type { Book } from '@/app/books/types/book';
import { ErrorHandler } from '../ErrorHandler';

type UseBooksResult = {
    books: Book[];
    loading: boolean;
    error: string | null;
};

export function useBooks(): UseBooksResult {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const booksController = new AbortController();
        const { signal } = booksController;

        const loadBooks = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
                    { signal }
                );

                if (response.ok) {
                    const booksData = (await response.json()) as Book[];

                    if (!signal.aborted) {
                        setBooks(booksData);
                        setError(null);
                    }
                } else {
                    const errorHandler = new ErrorHandler(response);
                    const message = await errorHandler.getErrorMessage();

                    if (!signal.aborted) {
                        setError(message);
                        setBooks([]);
                    }
                }
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError('Could not load the books.');
                    setBooks([]);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        void loadBooks();

        return () => {
            booksController.abort();
        };
    }, []);

    return { books, loading, error };
}