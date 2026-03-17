using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text;

namespace BooksLibrary.GoogleBooksImporter;

public interface IGoogleBooksApiHttpClient
{
    Task<GoogleApiVolumesResponse?> GetVolumes(int startIndex, int maxResults);
}

public class GoogleBooksApiHttpClient : IGoogleBooksApiHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IOptions<AppConfiguration> _options;

    public GoogleBooksApiHttpClient(
        HttpClient httpClient,
        IOptions<AppConfiguration> options
        )
    {
        _httpClient = httpClient;
        this._options = options;
        _httpClient.BaseAddress = new Uri("https://www.googleapis.com");
    }

    public async Task<GoogleApiVolumesResponse?> GetVolumes(int startIndex, int maxResults)
    {
        var key = _options.Value.GoogleBooksApiKey;
        var subject = _options.Value.GoogleBooksSubject;

        // https://www.googleapis.com/books/v1/volumes?key=***&q=subject:crochet&maxResults=20&orderBy=newest&printType=books&projection=full
        var uri = $"/books/v1/volumes?key={key}&q=subject:{subject}&startIndex={startIndex}&maxResults={maxResults}&orderBy=newest&printType=books&projection=full";
        var result = await _httpClient.GetFromJsonAsync<GoogleApiVolumesResponse>(uri);
        return result;
    }

}
