// import Link from 'next/link';
import Link from 'next/link';
import Stars from './Starts';
import type { Book } from './types/book';
// import { useMemo } from 'react'; // For the useMemo version

type Props = {
  book: Book;
};

/**
 * BookRow - a single table row component for a book
 *
 * Versions explained:
 * 1. Normal: direct rendering, simple and clean
 *    - Good for small tables
 *    - Reference: https://react.dev/learn/thinking-in-react
 *
 * 2. With useMemo (commented)
 *    - Memoizes parts of the JSX to prevent unnecessary re-renders
 *    - Useful for large tables or heavy JSX
 *    - Reference: https://react.dev/reference/react/useMemo
 *
 * 3. React Compiler (commented)
 *    - Automatic memoization applied by the compiler
 *    - Prevents unnecessary re-renders without useMemo or React.memo
 *    - Enable in Next.js:
 *        experimental: { reactCompiler: true } in next.config.js
 *    - References:
 *        React Compiler: https://react.dev/learn/react-compiler
 *        Next.js reactCompiler: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
 */
export default function BookRow({ book }: Props) {
  // -----------------------
  // Version with useMemo (example commented)
  // -----------------------
  /*
    const titleCell = useMemo(() => {
      return (
        <td className="py-4 px-4">
          <div>
            <p className="font-medium">{book.title}</p>
            <p className="text-sm text-light-text2">{book.author}</p>
          </div>
        </td>
      );
    }, [book.title, book.author]);
    */

  return (

    <tr className="transition-colors hover:bg-light-bg3">
      {/* Normal version */}
      <td className="py-4 px-4">

        <Link href={`/books/${book.bookId}`}>
          <p className="font-medium hover:text-light-purple">{book.title}</p>
        </Link>

        <p className="text-sm text-light-text2">{book.author}</p>

      </td>

      {/* To use useMemo, replace the above cell with {titleCell} */}
      {/* {titleCell} */}

      <td className="text-sm text-light-text2 align-middle text-center">
        <span className="bg-light-bg3 border rounded-xl px-2 py-0.5 inline-flex items-center justify-center">
          {book.genre}
        </span>
      </td>
      <td className="text-sm text-light-text2 text-center">
        <Stars rating={book.rating} />
      </td>
      <td className="text-sm text-light-text2 text-center">{book.pages}</td>
      <td className="text-sm text-light-text2 text-center">{book.year}</td>

      {/*
      <td className="text-sm text-light-text2 text-center">
        <span className="text-xs px-2 py-1 rounded-md bg-muted">
          {book.status}
        </span>
      </td>
      */}
    </tr>
  );
}
/**
 * React Compiler version:
 * - Enable experimental.reactCompiler in next.config.js
 * - No code changes needed
 * - React Compiler automatically memoizes the component and JSX parts
 */
