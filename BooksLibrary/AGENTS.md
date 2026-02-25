# Project description

This is a C# .net core 10 minimal api solutions.
BooksLibrary.Server is REST Api, minimal api.
BooksLibrary.Client is a SPA React application that consumes BooksLibrary.Server API.
BooksLibrary.Database is a Entity Framework Core 10 code first project that contains the database context and entities.

## Database
The database is PostgreSQL 18, and the connection string is stored in the appsettings.json file of BooksLibrary.Server project.
PostgreSQL runs in a Docker container, via the docker compose file `compose.yaml`.

## C# Unit test

Unit tests should use xunit.
Unit tests are placed in a similar project name, but with `.Tests` suffix. 
Test classes replicate the same structure as the code under test.

## Frontend
The frontend is a SPA React application.