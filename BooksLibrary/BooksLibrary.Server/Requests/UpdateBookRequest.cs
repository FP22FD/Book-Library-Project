namespace BooksLibrary.Server.Requests
{
    public class UpdateBookRequest
    {
        public required string Title { get; set; }
        public required string Authors { get; set; }

    }
}
