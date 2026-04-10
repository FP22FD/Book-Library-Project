'use server';

import Stars from './Starts';

export type Props = {
    bookId: string;
    title: string;
    authors: string;
    //year: number;
    createdAtUtc: string;
};

export async function BookDetailsPage({ bookId, title, authors, createdAtUtc }: Props) {
    return (
        <article
            id={`book-${bookId}`}
            aria-labelledby={`book-title-${bookId}`}
            className="flex flex-col gap-6"
        >
            <div className="flex flex-col gap-8 bg-light-bg1 p-8 rounded-xl shadow-md">

                {/* Header */}
                <header className="flex gap-6 border rounded-lg p-4">

                    {/* Cover */}
                    <figure className="rounded-xl p-5 bg-light-bg0 basis-1/5">
                        <img
                            alt={`Cover of book  ${title}`}
                            className="object-cover w-full h-full"
                        />
                    </figure>

                    {/* Info */}
                    <div className="bg-light-bg1 rounded-xl p-5 basis-4/5">
                        <h2
                            id={`book-title-${bookId}`}
                            className="text-xl font-semibold mb-1"
                        >
                            {title}
                        </h2>

                        <p className="text-sm text-light-text2 mb-6">
                            <span className="italic">by</span> {authors}
                            <span className="text-light-text2"> · {createdAtUtc}</span>
                        </p>

                        <div className="flex items-center gap-1 mb-6">
                            <Stars rating={3} />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {/* genres */}
                        </div>
                    </div>
                </header>

                {/* Bottom section */}
                <div className="flex gap-6">

                    {/* About */}
                    <section className="bg-light-bg1 rounded-xl p-5 border basis-2/3">
                        <h2 className="font-semibold text-lg mb-2">About</h2>

                        <p className="mb-4 leading-relaxed text-left">
                            The tale of Kvothe, from his childhood in a troupe of traveling players,
                            to years spent as a near-feral orphan in a crime-ridden city,
                            to his daringly brazen yet successful bid to enter a legendary
                            school of magic. This is a book about a young man who grows
                            to be one of the most notorious magicians his world has ever seen.
                        </p>
                    </section>

                    {/* Details */}
                    <section className="bg-light-bg1 rounded-xl p-5 border basis-1/3">
                        <h2 className="font-semibold text-lg mb-4">Details</h2>

                        <dl className="flex flex-col space-y-3 text-light-text2">
                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">Genre</dt>
                                <dd>fantasy</dd>
                            </div>

                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">Pages</dt>
                                <dd>302</dd>
                            </div>

                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">Language</dt>
                                <dd>English</dd>
                            </div>

                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">ISBN</dt>
                                <dd>978-0316012354</dd>
                            </div>
                        </dl>
                    </section>

                </div>
            </div>
        </article>
    );
}