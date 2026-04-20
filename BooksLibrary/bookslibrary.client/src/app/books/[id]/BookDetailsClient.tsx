'use client';

import { BookDetailsPage } from '../BookDetailsPage';
import { useBookById } from '@/services/hooks/useBook';

type Props = {
    id: string;
};

export default function BookDetailsClient({ id }: Props) {
    const { book, error, loading } = useBookById(id);

    if (!book) { return <p className="text-red-500">Book not found.</p> }
    if (error) return <p className="text-red-500">{error}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col gap-4 text-light-bg">
            <BookDetailsPage {...book} />
        </div>
    );
}