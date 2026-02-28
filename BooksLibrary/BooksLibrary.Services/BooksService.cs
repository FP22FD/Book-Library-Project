using BooksLibrary.Database;
using Microsoft.EntityFrameworkCore;

namespace BooksLibrary.Services
{
    public interface IBooksService
    {
        Task<Book> CreateBookAsync(string title, string authors);
    }

    public class BooksService : IBooksService
    {
        private readonly BooksDbContext _dbContext;

        public BooksService(
            BooksDbContext dbContext
            )
        {
            _dbContext = dbContext;
        }

        public async Task<Book> CreateBookAsync (string title, string authors)
        {
            var book = new Book
            {
                BookId = Guid.NewGuid(),
                Title = title,
                Authors = authors,
                CreatedAtUtc = DateTimeOffset.UtcNow
            };

            _dbContext.Books.Add(book);

            await _dbContext.SaveChangesAsync();

            return book;
        }
    }
}
