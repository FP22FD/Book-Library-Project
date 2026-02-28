namespace BooksLibrary.Server.Requests
{
    public class CreateBookRequest
    {
        public required string Title { get; set; }
        public required string Authors { get; set; }

    }
}
