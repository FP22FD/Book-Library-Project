import LibraryPageHead from '@/components/home/LibraryPageHead';
import BookShelfTest from '@/components/home/BookShelfTest';

// This is the main page of the app, rendered at the root URL ("/").
// It imports and uses various components to display the library dashboard, including a header, a bookshelf, and other sections that can be added later.
// The layout and styling are consistent with the rest of the app, as defined in the RootLayout component.
export default function Home() {
  return (
    <div>
      <LibraryPageHead className="mb-6" />
          <BookShelfTest />
          {/*<BookShelf className="border mb-6" />*/}
    </div>
  );
}
