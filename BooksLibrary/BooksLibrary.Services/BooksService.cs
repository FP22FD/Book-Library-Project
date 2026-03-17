using BooksLibrary.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BooksLibrary.Services;

public record CreateBookCommand(string Title, string Authors);
public record BookResult(Guid BookId, string Title, string Authors, DateTimeOffset CreatedAtUtc)
{
    public static BookResult FromBook(Book book) => new BookResult(book.BookId, book.Title, book.Authors, book.CreatedAtUtc);
}

public interface IBooksService
{
    Task<BookResult> CreateBookAsync(CreateBookCommand command);
    Task<BookResult?> GetBookAsync(Guid BookId, CancellationToken cancellationToken);
    Task<List<BookResult>> GetBooksAsync(CancellationToken cancellationToken);
    Task<BookResult?> UpdateBookAsync(UpdateBookCommand createBookCommand);
    Task<bool?> DeleteBookAsync(Guid bookId, CancellationToken cancellationToken);
}

public class BooksService : IBooksService
{
    private readonly BooksDbContext _dbContext;
    private readonly ILogger<BooksService> _logger;

    public BooksService(
        BooksDbContext dbContext,
        ILogger<BooksService> logger
        )
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<BookResult> CreateBookAsync(CreateBookCommand command)
    {
        var book = new Book
        {
            BookId = Guid.NewGuid(),
            Title = command.Title,
            Authors = command.Authors,
            CreatedAtUtc = DateTimeOffset.UtcNow
        };

        _dbContext.Books.Add(book);

        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Created book with ID {BookId}", book.BookId);

        var result = BookResult.FromBook(book);
        return result;
    }

    public async Task<BookResult?> GetBookAsync(Guid bookId, CancellationToken cancellationToken)
    {
        var book = await _dbContext.Books
            .Where(x => x.BookId == bookId)
            .Select(x => new BookResult(x.BookId, x.Title, x.Authors, x.CreatedAtUtc))
            .SingleOrDefaultAsync(cancellationToken);

        if (book == null)
        {
            return null;
        }

        return book;
    }

    public async Task<bool?> DeleteBookAsync(Guid bookId, CancellationToken cancellationToken)
    {
        var book = await _dbContext.Books.SingleOrDefaultAsync(x => x.BookId == bookId);
        if (book == null)
        {
            return null;
        }

        _dbContext.Books.Remove(book);
        var affectedRows = await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Deleted book with ID {BookId}", bookId);

        return affectedRows > 0;
    }

    public async Task<List<BookResult>> GetBooksAsync(CancellationToken cancellationToken)
    {
        var rows = await _dbContext.Books
            .OrderByDescending(x => x.CreatedAtUtc)
            .Select(x => new BookResult(x.BookId, x.Title, x.Authors, x.CreatedAtUtc))
            .ToListAsync(cancellationToken);
        return rows;
    }

    public async Task<BookResult?> UpdateBookAsync(UpdateBookCommand command)
    {
        var book = await _dbContext.Books.SingleOrDefaultAsync(x => x.BookId == command.BookId);
        if (book == null)
        {
            return null;
        }

        book.Title = command.Title;
        book.Authors = command.Authors;

        await _dbContext.SaveChangesAsync();
        _logger.LogInformation("Updated book with ID {BookId}", book.BookId);

        var result = BookResult.FromBook(book);
        return result;
    }


}
