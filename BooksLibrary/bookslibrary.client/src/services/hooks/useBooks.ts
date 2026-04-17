'use client';

import { useEffect, useState } from 'react';
import type { Book } from '@/app/books/types/book';
import { fetchBooks } from '@/services/books/booksApi';

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
        const controller = new AbortController();

        async function loadBooks() {
            try {
                const data = await fetchBooks(controller.signal);
                setBooks(data);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        void loadBooks();

        return () => controller.abort();
    }, []);

    return { books, loading, error };
}