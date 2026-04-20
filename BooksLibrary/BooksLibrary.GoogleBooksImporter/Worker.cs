using BooksLibrary.Database;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BooksLibrary.GoogleBooksImporter;

public class Worker : IHostedService
{
    private readonly ILogger<Worker> _logger;
    private readonly IHostApplicationLifetime _appLifetime;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IGoogleBooksApiHttpClient _googleBooksApiHttpClient;

    public Worker(
        ILogger<Worker> logger,
        IHostApplicationLifetime appLifetime,
        IServiceScopeFactory scopeFactory,
        IGoogleBooksApiHttpClient googleBooksApiHttpClient
    )
    {
        this._logger = logger;
        this._appLifetime = appLifetime;
        this._scopeFactory = scopeFactory;
        this._googleBooksApiHttpClient = googleBooksApiHttpClient;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

        using (var scope = _scopeFactory.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<BooksDbContext>();

            var books = await _googleBooksApiHttpClient.GetVolumes(0, 20);

            if (books?.items is not null) {
                foreach (var book in books.items)
                {
                    // Add these lines to log the full book data
                    var bookJson = JsonSerializer.Serialize(book.volumeInfo, new JsonSerializerOptions { WriteIndented = true });
                    _logger.LogInformation("--- Book data from Google API ---\n{BookJson}", bookJson);

                    var googleBooksId = book.id;
                    var title = book.volumeInfo.title;
                    var authors = string.Join(", ", book.volumeInfo.authors ?? []);
                    var category = book.volumeInfo.categories?.FirstOrDefault();
                    var PageCount = book.volumeInfo.pageCount;
                    var isbn13 = book.volumeInfo.industryIdentifiers?
                       .FirstOrDefault(i => i.type == "ISBN_13")?
                       .identifier;
                    var description = book.volumeInfo.description;
                    var thumbnailUrl = book.volumeInfo.imageLinks?.thumbnail;


                    var exists = await dbContext.Books.AnyAsync(x => x.GoogleBooksId == googleBooksId, cancellationToken);
                    if (exists)
                    {
                        continue;
                    }

                    _logger.LogInformation($"New book: {title}");

                    var entityBook = new Book
                    {
                        BookId = Guid.NewGuid(),
                        GoogleBooksId = googleBooksId,
                        Title = title,
                        Authors = authors,
                        CreatedAtUtc = DateTimeOffset.UtcNow,
                        LanguageCode = book.volumeInfo.language,
                        Category = category,
                        PageCount = book.volumeInfo.pageCount,
                        ISBN = isbn13,
                        Description = book.volumeInfo.description,
                        ThumbnailUrl = book.volumeInfo.imageLinks?.thumbnail

                    };

                    dbContext.Books.Add(entityBook);
                }
            }

           

            await dbContext.SaveChangesAsync();
        }

        _appLifetime.StopApplication();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Worker stopping at: {time}", DateTimeOffset.Now);
        return Task.CompletedTask;
    }
}
