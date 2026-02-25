using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BooksLibrary.Database
{
    public class Book
    {
        public Guid BookId { get; set; }
        public required string Title { get; set; }
        public string? Subtitle { get; set; }
        public required string Authors { get; set; }
        public string? Publisher { get; set; }
        public DateOnly? PublishedDate { get; set; }
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string? PreviewUrl { get; set; }
        public string? GoogleBooksId { get; set; }
        public required DateTimeOffset CreatedAtUtc { get; set; }
    }
}
