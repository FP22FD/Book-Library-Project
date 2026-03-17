using BooksLibrary.Database;
using Microsoft.EntityFrameworkCore;

namespace BooksLibrary.GoogleBooksImporter;

public class Program
{
    public static void Main(string[] args)
    {
        //Console.WriteLine("Google Books importer");
        //Console.WriteLine("What subjec?");
        //var subject = Console.ReadLine();
        //Console.WriteLine(subject);

        var builder = Host.CreateApplicationBuilder(args);

        builder.Configuration.AddUserSecrets<Program>();

        builder.Services.Configure<AppConfiguration>(builder.Configuration.GetSection("AppConfiguration"));

        // typed http client based on: https://timdeschryver.dev/blog/refactor-your-net-http-clients-to-typed-http-clients
        builder.Services.AddHttpClient<IGoogleBooksApiHttpClient, GoogleBooksApiHttpClient>();

        builder.Services.AddDbContext<BooksDbContext>(options =>
        {
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

            if (builder.Environment.IsDevelopment())
            {
                options.EnableSensitiveDataLogging();
            }
        });

        builder.Services.AddHostedService<Worker>();

        var host = builder.Build();
        host.Run();
    }
}
