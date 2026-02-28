namespace BooksLibrary.Server.Requests
{
    public class BookResponse
    {
        public Guid BookId { get; set; }
        public required string Title { get; set; }
        public required string Authors { get; set; }
        public required DateTimeOffset CreatedAtUtc { get; set; }

    }

}
