using BooksLibrary.Database;
using BooksLibrary.Server.EndPoints;
using BooksLibrary.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

// This is ASP.NET Core 10.0 minimal API application.
// The Program.cs file is the entry point of the application, where we configure services and the HTTP request pipeline.
var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy
            // No trailing slash!
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000"
                )
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


// Services
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// https://localhost:7263/openapi/v1.json
// https://localhost:7263/scalar/v1
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();

// PostgreSQL with Entity Framework Core. GetConnectionString looks for "DefaultConnection" in appsettings.json
// BooksDbContext is data bse that contains DBSet the Books table.
builder.Services.AddDbContext<BooksDbContext>(options =>
{
    // Use the connection string from appsettings.json
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

    if (builder.Environment.IsDevelopment())
    {
        // For development,
        // we want to see the SQL queries being executed in the console for debugging purposes.
        options.EnableSensitiveDataLogging();
    }
});

builder.Services.AddScoped<IBooksService, BooksService>();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

// Apply migrations on startup (development only)
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<BooksDbContext>();
    db.Database.Migrate();
}

// VS React template setup - Don't need to setup CORS for static files, because they are served from the same origin as the API.
//app.UseDefaultFiles();

//app.MapStaticAssets();

// Configure the HTTP request pipeline.
app.MapOpenApi();
app.MapScalarApiReference();

app.MapBooksEndpoints();

app.Run();
