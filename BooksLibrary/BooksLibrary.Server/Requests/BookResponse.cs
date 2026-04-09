using BooksLibrary.Services;

namespace BooksLibrary.Server.Requests;

public record BookResponse(Guid BookId, string Title, string Authors, DateTimeOffset CreatedAtUtc);

public static class BookResponseExtension
{
    public static BookResponse ToResponse(this BookResult bookResult)
    {
        return new BookResponse(bookResult.BookId, bookResult.Title, bookResult.Authors, bookResult.CreatedAtUtc);
    } 
}
