'use client';

import { useEffect, useState } from 'react';
import type { Book } from '@/app/books/types/book';
import { ErrorHandler } from '../ErrorHandler';

type UseBookByIdResult = {
    book: Book | null;
    loading: boolean;
    error: string | null;
};

export function useBookById(id: string): UseBookByIdResult {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setBook(null);
            setError('Book id is required.');
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const { signal } = controller;

        const loadBook = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
                    { signal }
                );

                if (response.ok) {
                    const bookData = (await response.json()) as Book;

                    if (!signal.aborted) {
                        setBook(bookData);
                        setError(null);
                    }
                } else {
                    const errorHandler = new ErrorHandler(response);
                    const message = await errorHandler.getErrorMessage();

                    if (!signal.aborted) {
                        setError(message);
                        setBook(null);
                    }
                }
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError('Could not load the book.');
                    setBook(null);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        void loadBook();

        return () => {
            controller.abort();
        };
    }, [id]);

    return { book, loading, error };
}