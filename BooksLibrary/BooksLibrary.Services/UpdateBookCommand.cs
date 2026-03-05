namespace BooksLibrary.Services
{
    public record UpdateBookCommand(Guid BookId, string Title, string Authors);
}