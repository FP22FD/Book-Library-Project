using BooksLibrary.Database;
using BooksLibrary.Server.Requests;
using BooksLibrary.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddProblemDetails();

builder.Services
    .AddDbContext<BooksDbContext>(options =>
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

        if (builder.Environment.IsDevelopment())
        {
            options.EnableSensitiveDataLogging();
        }
    });

// TODO: Transient, Scoped, Singleton
builder.Services.AddScoped<IBooksService, BooksService>();


var app = builder.Build();


// Apply migrations on startup (development only)
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<BooksDbContext>();
    db.Database.Migrate();
}

// Don't need to setup CORS for static files, because they are served from the same origin as the API.
app.UseDefaultFiles();

app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var booksGroup = app.MapGroup("/api/books")
    .WithTags("Books API");

booksGroup.MapPost("", async (
    CreateBookRequest request,
    IBooksService booksService
    ) =>
{
    // TODO:
    // 1- manual handling
    // 2- FluentValidation library
    // 3- Attributes in Request object
    if (string.IsNullOrEmpty(request.Title) || string.IsNullOrEmpty(request.Authors))
    {
        return Results.Problem(statusCode: StatusCodes.Status400BadRequest, detail: "Title and Authors are mandatory");
    }

    var result = await booksService.CreateBookAsync(new CreateBookCommand(request.Title, request.Authors));
    var response = new BookResponse
    {
        BookId = result.BookId,
        Title = result.Title,
        Authors = result.Authors,
        CreatedAtUtc = result.CreatedAtUtc
    };
    return Results.Ok(response);
})
    .WithName("CreateBook")
    .Produces<BookResponse>(StatusCodes.Status200OK)
    .ProducesValidationProblem();

booksGroup.MapGet("", async (IBooksService booksService, CancellationToken cancellationToken) =>
{
    var result = await booksService.GetBooksAsync(cancellationToken);
    var response = result.Select(x => new BookResponse
    {
        BookId = x.BookId,
        Title = x.Title,
        Authors = x.Authors,
        CreatedAtUtc = x.CreatedAtUtc
    }).ToList();
    return Results.Ok(response);
});


booksGroup.MapPut("{bookId:guid}", async (
    Guid bookId, 
    UpdateBookRequest request,
    IBooksService booksService,
    CancellationToken cancellationToken
    ) =>
{
    if (string.IsNullOrEmpty(request.Title) || string.IsNullOrEmpty(request.Authors))
    {
        return Results.Problem(statusCode: StatusCodes.Status400BadRequest, detail: "Title and Authors are mandatory");
    }

    var result = await booksService.UpdateBookAsync(new UpdateBookCommand(bookId, request.Title, request.Authors));

     if (result is null)
    {
        return Results.NotFound();
    }

    var response = new BookResponse
    {
        BookId = result.BookId,
        Title = result.Title,
        Authors = result.Authors,
        CreatedAtUtc = result.CreatedAtUtc
    };
    return Results.Ok(response);
})
    .WithName("UpdateBook")
    .Produces<BookResponse>(StatusCodes.Status200OK)
    .ProducesValidationProblem();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
