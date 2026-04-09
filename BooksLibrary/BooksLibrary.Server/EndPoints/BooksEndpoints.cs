using BooksLibrary.Server.Requests;
using BooksLibrary.Services;

namespace BooksLibrary.Server.EndPoints;

public static class BooksEndpointsExtensions
{
    public static WebApplication MapBooksEndpoints(this WebApplication app)
    {
        var booksGroup = app.MapGroup("/api/books")
            .WithTags("Books API")
            .RequireCors("AllowReactApp");

        booksGroup.MapPost("", CreateBookAsync)
            .WithName("CreateBook")
            .Produces<BookResponse>(StatusCodes.Status200OK)
            .ProducesValidationProblem();

        booksGroup.MapGet("{bookId:guid}", GetBookAsync)
            .WithName("GetBookById")
            .Produces<BookResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);

        booksGroup.MapGet("", GetBooksAsync)
            .WithName("GetBooks")
            .Produces<BookResponse[]>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
       
        booksGroup.MapPut("{bookId:guid}", EditBookAsync)
            .WithName("UpdateBook")
            .Produces<BookResponse>(StatusCodes.Status200OK)
            .ProducesValidationProblem();

        booksGroup.MapDelete("{bookId:guid}", DeleteBookAsync);

        return app;

        static async Task<IResult> CreateBookAsync(
            CreateBookRequest request,
            IBooksService booksService
            )
        {
            if (string.IsNullOrEmpty(request.Title) || string.IsNullOrEmpty(request.Authors))
            {
                return Results.Problem(statusCode: StatusCodes.Status400BadRequest, detail: "Title and Authors are mandatory");
            }

            var result = await booksService.CreateBookAsync(new CreateBookCommand(request.Title, request.Authors));
            var response = result.ToResponse();
            return Results.Ok(response);
        }

        static async Task<IResult> GetBookAsync(
            Guid bookId,
            IBooksService booksService,
            CancellationToken cancellationToken
            )
        {
            var result = await booksService.GetBookAsync(bookId, cancellationToken);
            if (result == null)
            {
                return Results.NotFound();
            }

            var response = result.ToResponse();
            return Results.Ok(response);
        }

        static async Task<IResult> GetBooksAsync(IBooksService booksService, CancellationToken cancellationToken)
        {
            var result = await booksService.GetBooksAsync(cancellationToken);
            var response = result.Select(x => x.ToResponse()).ToList();
            return Results.Ok(response);
        }

        static async Task<IResult> EditBookAsync(
            Guid bookId,
            UpdateBookRequest request,
            IBooksService booksService,
            CancellationToken cancellationToken
            )
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

            var response = result.ToResponse();
            return Results.Ok(result.ToResponse());

        }

        static async Task<IResult> DeleteBookAsync(
            Guid bookId,
            IBooksService booksService,
            CancellationToken cancellationToken
            )
        {
            var result = await booksService.DeleteBookAsync(bookId, cancellationToken);
            if (result == null)
            {
                return Results.NotFound();
            }

            if (result == false)
            {
                return Results.BadRequest();
            }

            return Results.NoContent();
        }
    }

}