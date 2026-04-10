import { Book } from '@/app/books/types/book';

//TODO: This fetch is not used anywhere and not working. But it simulates an async data fetch for the book list. We can replace this with a real API call later.
export const ALL_BOOKS_ASYNC = new Promise<Book[]>((resolve, reject) => {
  setTimeout(() => {
    resolve(ALL_BOOKS);
  }, 1000);

  // reject(new Error("Failed to fetch books"));
});

export const ALL_BOOKS: Book[] = [
  {
    bookId: 1,
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genre: 'Fantasy',
    year: 2007,
    pages: 662,
    rating: 4.8,
    status: 'Reading',
    progress: 68,
    accent: '#0d7a6a',
  },
  {
    bookId: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    pages: 180,
    rating: 4.2,
    status: 'Reading',
    progress: 35,
    accent: '#e76f51',
  },
  {
    bookId: 3,
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    year: 2019,
    pages: 336,
    rating: 4.1,
    status: 'Reading',
    progress: 52,
    accent: '#457b9d',
  },
  {
    bookId: 4,
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    genre: 'Biography',
    year: 2011,
    pages: 656,
    rating: 4.5,
    status: 'Reading',
    progress: 20,
    accent: '#8d99ae',
  },
  {
    bookId: 5,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'History',
    year: 2011,
    pages: 443,
    rating: 4.6,
    status: 'Reading',
    progress: 61,
    accent: '#bc4749',
  },
  {
    bookId: 6,
    title: 'Meditations',
    author: 'Marcus Aurelius',
    genre: 'Philosophy',
    year: 1980,
    pages: 254,
    rating: 4.7,
    status: 'Reading',
    progress: 12,
    accent: '#6a994e',
  },
];

const genres = [
  { name: 'Fiction', count: 142, icon: '✦' },
  { name: 'Non-Fiction', count: 89, icon: '◈' },
  { name: 'Mystery', count: 67, icon: '◉' },
  { name: 'Science Fiction', count: 54, icon: '◎' },
  { name: 'Biography', count: 41, icon: '◇' },
  { name: 'History', count: 38, icon: '▣' },
  { name: 'Philosophy', count: 29, icon: '◈' },
  { name: 'Poetry', count: 22, icon: '✦' },
];

export const collections = ['Currently Reading', 'Want to Read', 'Finished', 'Favourites'];

export const defaultFeaturedBooks = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    pages: 464,
    rating: 4.7,
    genre: 'Software Engineering',
    status: 'Reading',
    progress: 68,
    tags: ['Code Quality', 'Best Practices'],
    spineIdx: 0,
  },
  {
    title: 'Design Patterns',
    author: 'Erich Gamma et al.',
    year: 1994,
    pages: 395,
    rating: 4.6,
    genre: 'Software Engineering',
    status: 'Finished',
    progress: 100,
    tags: ['Architecture', 'OOP'],
    spineIdx: 1,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    year: 1999,
    pages: 352,
    rating: 4.8,
    genre: 'Programming',
    status: 'Finished',
    progress: 100,
    tags: ['Craft', 'Best Practices'],
    spineIdx: 2,
  },
  {
    title: 'Refactoring',
    author: 'Martin Fowler',
    year: 1999,
    pages: 448,
    rating: 4.7,
    genre: 'Software Engineering',
    status: 'Reading',
    progress: 41,
    tags: ['Code Quality'],
    spineIdx: 3,
  },
  {
    title: "You Don't Know JS Yet",
    author: 'Kyle Simpson',
    year: 2020,
    pages: 143,
    rating: 4.7,
    genre: 'JavaScript',
    status: 'Want',
    progress: 0,
    tags: ['JavaScript', 'Deep Dive'],
    spineIdx: 4,
  },
  {
    title: 'System Design Interview',
    author: 'Alex Xu',
    year: 2020,
    pages: 322,
    rating: 4.6,
    genre: 'System Design',
    status: 'Want',
    progress: 0,
    tags: ['Architecture', 'Scalability'],
    spineIdx: 5,
  },
];

export const recentActivity = [
  { action: 'Finished reading', book: 'Sapiens', time: '2 hours ago' },
  { action: 'Added to library', book: 'Dune', time: 'Yesterday' },
  { action: 'Started reading', book: 'Meditations', time: '3 days ago' },
  { action: 'Rated 5 stars', book: 'The Name of the Wind', time: 'Last week' },
];

export const stats = [
  { label: 'Books Read', value: '247', sub: 'this year: 38' },
  { label: 'Pages Turned', value: '84k', sub: 'avg 340/day' },
  { label: 'Authors', value: '163', sub: '18 new genres' },
  { label: 'Reading Streak', value: '42', sub: 'days in a row' },
];
