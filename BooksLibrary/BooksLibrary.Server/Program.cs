using BooksLibrary.Database;
using BooksLibrary.Server.EndPoints;
using BooksLibrary.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

// const string SpaCors = "_SpaCors";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// https://localhost:7263/openapi/v1.json
// https://localhost:7263/scalar/v1
builder.Services.AddOpenApi();

builder.Services.AddProblemDetails();

builder.Services
    .AddDbContext<BooksDbContext>(options =>
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

        if (builder.Environment.IsDevelopment())
        {
            options.EnableSensitiveDataLogging();
        }
    });

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: DevSpaCors, policy =>
//    {
//        policy.WithOrigins(
//          "https://localhost:7263",
//          "https://localhost:49676"
//          )
//        .AllowAnyHeader()
//        .AllowAnyMethod()
//        .AllowCredentials();
//    });
//});

builder.Services.AddScoped<IBooksService, BooksService>();

var app = builder.Build();

// Apply migrations on startup (development only)
if (app.Environment.IsDevelopment())
{
    // not needed as the SPA is served from same origin via MapStaticAssets()
    // app.UseCors(DevSpaCors);

    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<BooksDbContext>();
    db.Database.Migrate();
}

// Don't need to setup CORS for static files, because they are served from the same origin as the API.
app.UseDefaultFiles();

app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.MapBooksEndpoints();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
