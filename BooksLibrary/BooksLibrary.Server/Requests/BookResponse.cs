using BooksLibrary.Services;

namespace BooksLibrary.Server.Requests;

public record BookResponse(Guid BookId, string Title, string Authors, DateTimeOffset CreatedAtUtc, string? LanguageCode, string? Category, int? PageCount, string? ISBN, string? Description, string? ThumbnailUrl, decimal? AverageRating);

public static class BookResponseExtension
{
    public static BookResponse ToResponse(this BookResult bookResult)
    {
        return new BookResponse(
            bookResult.BookId,
            bookResult.Title,
            bookResult.Authors,
            bookResult.CreatedAtUtc,
            bookResult.LanguageCode,
            bookResult.Category,
            bookResult.PageCount,
            bookResult.ISBN,
            bookResult.Description,
            bookResult.ThumbnailUrl,
            bookResult.AverageRating
            );
    }
}
