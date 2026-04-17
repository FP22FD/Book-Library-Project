import LibraryPageHead from '@/components/home/LibraryPageHead';
import BookShelf from '@/components/home/BookShelf';

// This is the main page of the app, rendered at the root URL ("/").
export default function Home() {
  return (
    <div>
      <LibraryPageHead className="mb-6" />
      <BookShelf className="border mb-6" />
    </div>
  );
}
