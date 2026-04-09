using BooksLibrary.Database;
using BooksLibrary.Server.EndPoints;
using BooksLibrary.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

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

builder.Services.AddDbContext<BooksDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
    }
});

builder.Services.AddScoped<IBooksService, BooksService>();

var app = builder.Build();

app.UseHttpsRedirection();

// CORS
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
