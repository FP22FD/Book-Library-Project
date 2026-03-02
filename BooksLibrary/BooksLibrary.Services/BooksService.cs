using BooksLibrary.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record CreateBookCommand(string Title, string Authors);
public record BookResult(Guid BookId, string Title, string Authors, DateTimeOffset CreatedAtUtc)
{
    public static BookResult FromBook(Book book) => new BookResult(book.BookId, book.Title, book.Authors, book.CreatedAtUtc);
}

namespace BooksLibrary.Services
{
    public interface IBooksService
    {
        Task<BookResult> CreateBookAsync(CreateBookCommand command);
        Task<List<BookResult>> GetBooksAsync(CancellationToken cancellationToken);
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

        public async Task<List<BookResult>> GetBooksAsync(CancellationToken cancellationToken)
        {
            var rows = await _dbContext.Books
                //.AsNoTracking()
                //.Where(x => x.Authors == "ghghgjh")
                .OrderByDescending(x => x.CreatedAtUtc)
                .Select(x => new BookResult(x.BookId, x.Title, x.Authors, x.CreatedAtUtc))
                .ToListAsync(cancellationToken);
            return rows;
        }
    }
}
