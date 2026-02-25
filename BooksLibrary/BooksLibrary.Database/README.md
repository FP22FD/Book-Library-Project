# EF Core

## Pre-requisites

- A running Docker Desktop
- A running PostgreSQL container, via the docker compose file `compose.yaml` in the root directory of the solution.

> docker compose up -d

NB. All EF Core commands must run from the `BooksLibrary.Database` project directory.

## Install the dotnet global tool for EF Core

> dotnet tool install --global dotnet-ef

## Add migration

> dotnet ef migrations add <MigrationName>

## Apply migration

> dotnet ef database update
