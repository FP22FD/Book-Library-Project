
//Represents a book in the library system.

export interface Book {
  bookId: string;
  title: string;
  authors: string;
  createdAtUtc: string;
  languageCode: string;
  pageCount?: number;
  isbn?: string | null;
  category?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  averageRating?: number | null;
}
