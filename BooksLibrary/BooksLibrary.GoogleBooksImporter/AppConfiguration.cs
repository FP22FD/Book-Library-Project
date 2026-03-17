using System;
using System.Collections.Generic;
using System.Text;

namespace BooksLibrary.GoogleBooksImporter;

public record AppConfiguration
{
    public string GoogleBooksApiKey { get; init; } = string.Empty;
    public string GoogleBooksSubject { get; init; } = string.Empty;
}
