using BooksLibrary.Database;
using Microsoft.EntityFrameworkCore;

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

            foreach (var book in books.items)
            {
                var googleBooksId = book.id;
                var title = book.volumeInfo.title;
                var authors = string.Join(", ", book.volumeInfo.authors ?? []);

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
                    CreatedAtUtc = DateTimeOffset.UtcNow
                };

                dbContext.Books.Add(entityBook);
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
