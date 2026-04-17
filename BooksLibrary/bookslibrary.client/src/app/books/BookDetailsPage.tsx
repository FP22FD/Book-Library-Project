'use server';

import Stars from './Starts';
import DescriptionPreview from './BookDescription';
import BookCoverPlaceholder from './BookPlaceholder';
import type { Book } from './types/book';

export async function BookDetailsPage({ bookId, title, authors, createdAtUtc, languageCode, pageCount, isbn, category, description, thumbnailUrl }: Book) {
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

                        <BookCoverPlaceholder
                            src={thumbnailUrl}
                            alt={`Cover of book ${title}`}
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
                            <span className="italic font-semibold">by</span> {authors}
                            <span className="text-light-text2"> · {new Date(createdAtUtc).getUTCFullYear()}</span>
                        </p>

                        <div className="flex items-center gap-1 mb-6">
                            <Stars rating={0} />
                            <span className="text-xs text-light-text2">(No reviews yet)</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {/* genres */}
                        </div>
                    </div>
                </header>

                {/* Bottom section */}
                <div className="flex gap-6">

                    {/* About */}
                    <section className="basis-2/3 bg-light-bg1 rounded-xl p-5 border">
                        <h2 className="font-semibold text-lg mb-2">About</h2>

                        <div>
                            <DescriptionPreview text={description} />
                        </div>
                    </section>

                    {/* Details */}
                    <section className="basis-1/3 bg-light-bg1 rounded-xl p-5 border">
                        <h2 className="font-semibold text-lg mb-4">Details</h2>

                        <dl className="flex flex-col space-y-3 text-light-text2">
                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">Category</dt>
                                <dd>{category}</dd>
                            </div>

                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">Pages</dt>
                                <dd>{pageCount}</dd>
                            </div>

                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">Language</dt>
                                <dd>{languageCode}</dd>
                            </div>

                            <div className="flex justify-between border-b pb-1">
                                <dt className="opacity-75">ISBN</dt>
                                <dd>{isbn}</dd>
                            </div>
                        </dl>
                    </section>

                </div>
            </div>
        </article>
    );
}