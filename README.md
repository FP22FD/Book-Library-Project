CD ./BooksLibrary/BooksLibrary.client
> npm i


Start PostgreSQL and Adminer

> docker compose up -d

Stop PostgreSQL and Adminer
> docker compose down

Adminer UI
http://localhost:8080/

# 📚 Book-Library Project

A modern web application for managing and displaying a book catalog. This project demonstrates a full-stack architecture using .NET for the backend and React for the frontend, with a focus on clean code, scalability, and best practices.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [MVP Definition](#-mvp-definition)
- [Technologies](#-technologies)
- [Architecture Decisions](#-architecture-decisions)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development Roadmap](#-development-roadmap)
  - [Frontend](#-frontend)
  - [Backend](#-backend)
  - [DevOps & Infrastructure](#-devops--infrastructure)
  - [Documentation & Quality](#-documentation--quality)
- [Relevant Links](#-relevant-links)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

The **Book-Library Project** is an internal book catalog application that allows users to browse and view details of books imported from the [Open Library](https://openlibrary.org/) dataset. This is **not an e-commerce platform** but rather a learning project focused on:

- Building a clean, scalable full-stack application
- Implementing modern development practices
- Exploring cloud technologies and DevOps workflows
- Demonstrating proficiency in C# (.NET) and React

**Key Features:**
- Import and display books from Open Library dataset
- Browse book catalog with pagination
- View detailed information about individual books
- Responsive, mobile-first design
- RESTful API architecture

---

## 🎯 MVP Definition

**MVP = Book Catalog (not e-commerce)**

The Minimum Viable Product focuses on a simple, working application with the following principles (defined in meeting 16.01.2026):

- ✅ **Backend-first approach** – Prioritize API and data layer
- ✅ **C# (.NET) backend** – All backend logic in C#
- ✅ **Mock data initially** – Start with in-memory data, then transition to database
- ✅ **Local database (Docker)** – Database is optional in the very beginning
- ✅ **No Azure requirement for MVP** – Cloud deployment is a nice-to-have

**Core MVP Deliverables:**
1. Backend API with book endpoints (GET /books, GET /books/{id})
2. Data import console app (C#) to load 50-100 books from Open Library
3. React frontend displaying book list and detail pages
4. Basic responsive UI with routing

---

## 🛠️ Technologies

### Frontend
- [React](https://react.dev/) – UI framework
- [Tailwind CSS](https://tailwindcss.com/) / [Bootstrap](https://getbootstrap.com/) – Styling
- [Playwright](https://playwright.dev/) – E2E testing

### Backend
- [.NET (C#)](https://learn.microsoft.com/dotnet/) – Backend framework
- [Entity Framework Core](https://learn.microsoft.com/ef/core) – ORM with Code First approach
- [Minimal API](https://learn.microsoft.com/dotnet/core/tutorials/min-web-api) – Lightweight API architecture
- [Swagger/OpenAPI](https://swagger.io/) – API documentation

### Data Source
- [Open Library](https://openlibrary.org/) – Book metadata and dataset

### DevOps & Infrastructure
- [GitHub](https://github.com/) – Version control and project management
- [GitHub Projects](https://docs.github.com/issues/planning-and-tracking-with-projects) – Kanban board for task tracking
- [GitHub Actions](https://docs.github.com/actions) – CI/CD pipelines
- [Docker](https://www.docker.com/) – Containerization for local development
- [Azure](https://azure.microsoft.com/) – Cloud hosting (App Service, Blob Storage)

### Optional/Advanced Technologies
- [Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/) – Book cover storage
- [Azure AI Search](https://learn.microsoft.com/azure/search/) – Advanced search functionality
- [OpenAI API](https://platform.openai.com/docs) – AI-powered features
- [SignalR](https://learn.microsoft.com/aspnet/core/signalr/) – Real-time updates
- [.NET Aspire](https://learn.microsoft.com/dotnet/aspire/) – Local orchestration (exploratory)

---

## 🏗️ Architecture Decisions

### Frontend Strategy: Mobile-First Approach
- UI and layout are designed starting from **mobile screens**
- Desktop and larger screens are handled via **responsive design**
- Ensures better usability and scalability across devices

📖 **Reference:** [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

### Backend Strategy: Code First with Entity Framework Core
- Database schema is **generated from C# domain models**
- **Migrations** are used to evolve the database
- Enables faster iteration and easier refactoring during development
- Follows **Clean Architecture** principles with clear separation of concerns

📖 **References:**
- [Entity Framework Core](https://learn.microsoft.com/ef/core)
- [Clean Architecture](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#clean-architecture)
- [Dependency Injection](https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection)

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) (optional, for local database)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FP22FD/Book-Library-Project.git
   cd Book-Library-Project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   dotnet restore
   dotnet build
   ```

3. **Configure Connection Strings**
   - Use [User Secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets) for local development:
     ```bash
     dotnet user-secrets init
     dotnet user-secrets set "ConnectionStrings:DefaultConnection" "your-connection-string"
     ```

4. **Run Database Migrations** (when using EF Core)
   ```bash
   dotnet ef database update
   ```

5. **Run the Backend**
   ```bash
   dotnet run
   ```
   API will be available at `https://localhost:5001` (or configured port)

6. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000` (or configured port)

7. **Import Book Data** (Console App)
   ```bash
   cd ../console-import
   dotnet run
   ```
   This will import 50-100 books from the Open Library dataset into your database.

### Running with Docker (Optional)

```bash
# Start database container
docker run -d -p 5432:5432 --name book-library-db \
  -e POSTGRES_PASSWORD=yourpassword \
  postgres:latest
```

---

## 📁 Project Structure

```
Book-Library-Project/
├── backend/              # .NET backend API
│   ├── src/
│   │   ├── API/         # Minimal API endpoints
│   │   ├── Core/        # Domain models, interfaces
│   │   ├── Infrastructure/ # EF Core, repositories
│   │   └── Application/ # Business logic, services
│   └── tests/           # Unit and integration tests
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client services
│   │   └── App.jsx      # Main app component
│   └── tests/           # Playwright E2E tests
├── console-import/      # C# console app for data import
│   └── Program.cs       # Import logic
└── README.md            # This file
```

---

## 📈 Development Roadmap

### 🖥️ Frontend

#### ✅ Must Have (MVP)
- [ ] **Frontend Project Setup**
  - [ ] Initialize [React](https://react.dev/) project
  - [ ] Configure basic layout and routing
  - [ ] Integrate [Bootstrap](https://getbootstrap.com/) or [Tailwind](https://tailwindcss.com/)
- [ ] **Display Book List**
  - [ ] Consume backend API (mock or real data)
  - [ ] Implement pagination or infinite scroll
  - [ ] Create basic responsive UI
- [ ] **Display Book Details**
  - [ ] Build book detail page
  - [ ] Implement routing from list to details
  - [ ] Add back navigation

#### ⚠️ Should Have
- [ ] **Frontend Testing**
  - [ ] Setup [Playwright](https://playwright.dev/) for automated UI tests
  - [ ] Write E2E tests for book list
  - [ ] Write E2E tests for book details

#### ✨ Nice to Have
- [ ] **Shopping Cart**
  - [ ] Add/remove books functionality
  - [ ] Cart summary view
- [ ] **AI Integration (Frontend)**
  - [ ] AI-powered book recommendations
  - [ ] AI-based search/filter using [OpenAI API](https://platform.openai.com/docs)
- [ ] **Tailwind CSS Enhancement**
  - [ ] Full [Tailwind](https://tailwindcss.com/) setup with custom theme
- [ ] **Alternative Vue Frontend**
  - [ ] Build Vue version of core features ([Vue.js](https://vuejs.org/))
- [ ] **Real-time UI Updates**
  - [ ] React to backend changes via SignalR (no manual refresh needed)

---

### ⚙️ Backend

#### ✅ Must Have (MVP)
- [ ] **Backend Project Setup**
  - [ ] Initialize .NET project with **C#**
  - [ ] Implement [Minimal API](https://learn.microsoft.com/dotnet/core/tutorials/min-web-api)
  - [ ] Apply [Clean Architecture](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#clean-architecture) principles
  - [ ] Configure [Dependency Injection](https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection)
  - [ ] Setup CORS for frontend communication
- [ ] **Database Setup (Code First)**
  - [ ] Configure Entity Framework Core **Code First**
  - [ ] Setup automatic database generation via migrations
  - [ ] Enable local database using Docker (optional initially)
- [ ] **Book Management API**
  - [ ] Implement `GET /books` endpoint
  - [ ] Implement `GET /books/{id}` endpoint
  - [ ] Add validation and error handling
- [ ] **Book Dataset Import (Console App – C#)**
  - [ ] Create .NET Console application in **C#**
  - [ ] Import 50–100 books from [Open Library data dump](https://openlibrary.org/data)
  - [ ] Configure console app to run locally
  - [ ] Use User Secrets for connection strings
  - [ ] Ensure backend APIs rely **only on internal database data**

#### ⚠️ Should Have
- [ ] **API Documentation**
  - [ ] Integrate [Swagger/OpenAPI](https://swagger.io/)
  - [ ] Document all endpoints
- [ ] **Azure Blob Storage**
  - [ ] Upload and store book covers in [Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/)
- [ ] **Backend Testing**
  - [ ] Write unit tests ([.NET Testing](https://learn.microsoft.com/dotnet/core/testing))
  - [ ] Write integration tests

#### ✨ Nice to Have
- [ ] **Authentication**
  - [ ] Implement JWT authentication
  - [ ] Add user registration/login ([ASP.NET Security](https://learn.microsoft.com/aspnet/core/security/))
- [ ] **Search Functionality**
  - [ ] Add filtering and sorting capabilities
  - [ ] Integrate [Azure AI Search](https://learn.microsoft.com/azure/search/) (optional)
- [ ] **AI Book Summaries**
  - [ ] Generate summaries via [OpenAI API](https://platform.openai.com/docs)
  - [ ] Implement caching for AI-generated content
- [ ] **Advanced Import**
  - [ ] UPSERT logic (update existing books)
  - [ ] Optional REST-based import (learning purpose)
- [ ] **Real-time Synchronization (SignalR)**
  - [ ] Configure SignalR hubs for book updates
  - [ ] Implement server-to-client push notifications
  - [ ] Add authentication/authorization for SignalR connections
  - [ ] Test consistency and performance
- [ ] **Message-driven Architecture**
  - [ ] Setup Azure Queue Storage for async communication
  - [ ] Implement producer/consumer pattern
  - [ ] Define message structure and error handling
  - [ ] Write tests for message processing
- [ ] **.NET Aspire (Exploratory)**
  - [ ] Evaluate Aspire for local orchestration
  - [ ] Manage backend, database, and messaging services with Aspire

---

### 🚀 DevOps & Infrastructure

#### ✅ Must Have (MVP)
- [x] **Repository Setup**
  - [x] Create public [GitHub repository](https://github.com/FP22FD/Book-Library-Project)
  - [ ] Write comprehensive README describing:
    - [ ] Project goal
    - [ ] Architecture overview
    - [ ] Technologies used
    - [ ] How to run locally
  - [ ] Configure branch protection rules
- [ ] **Project Management**
  - [ ] Setup [GitHub Projects](https://docs.github.com/issues/planning-and-tracking-with-projects) with Kanban board
  - [ ] Create columns: Backlog, To Do, In Progress, Done
  - [ ] **Note:** Backlog data entry and initial task drafting assisted by **AI (GitHub Copilot)**
  - [ ] **Important:** All tasks **reviewed, updated, and validated manually**
  - [ ] Assign clear ownership and track progress

#### ⚠️ Should Have
- [ ] **Environment Configuration**
  - [ ] Manage connection strings via environment variables
  - [ ] Document local vs Azure environments
  - [ ] Create setup documentation
- [ ] **Local Development with Docker**
  - [ ] Setup database container
  - [ ] Enable multiple services running locally
  - [ ] Create optional Docker Compose configuration
- [ ] **Azure Hosting**
  - [ ] Deploy backend API on [Azure App Service](https://learn.microsoft.com/azure/app-service)
  - [ ] Deploy frontend (static hosting or App Service)

#### ✨ Nice to Have
- [ ] **CI/CD**
  - [ ] Setup [GitHub Actions](https://docs.github.com/actions) workflows
  - [ ] Create build & test pipelines
  - [ ] Implement auto-deploy to Azure
- [ ] **Monitoring & Logging**
  - [ ] Integrate [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)
  - [ ] Setup error tracking
  - [ ] Create monitoring dashboards
- [ ] **Infrastructure as Code**
  - [ ] Use Terraform for Azure resource provisioning (optional, post-MVP)

---

### 📚 Documentation & Quality

#### ⚠️ Should Have
- [ ] **README Documentation**
  - [ ] Setup instructions
  - [ ] Architecture overview
  - [ ] API usage guide
- [ ] **Coding Standards**
  - [ ] Define and document coding conventions
  - [ ] Setup ESLint / Prettier for frontend
  - [ ] Configure .NET analyzers for backend

---

## 🔗 Relevant Links

### Open Library Resources
- [Open Library Main Site](https://openlibrary.org/)
- [Open Library API Documentation](https://openlibrary.org/developers/api)
- [Open Library Data & Bulk Access Rules](https://openlibrary.org/data)
- [Open Library Data Dumps Info](https://openlibrary.org/developers/dumps)

### Technology Documentation
- [React Documentation](https://react.dev/)
- [.NET Documentation](https://learn.microsoft.com/dotnet/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Azure Documentation](https://learn.microsoft.com/azure/)
- [GitHub Actions](https://docs.github.com/actions)
- [Playwright](https://playwright.dev/)
- [Swagger/OpenAPI](https://swagger.io/)

---

## 🧭 Final Recommendation

> **Focus first on: C# Backend + Data Import + Simple Frontend**
> 
> Advanced features (SignalR, Queues, Terraform, Aspire) are **explicitly optional** and should only be considered if time allows after MVP completion.

**Recommended Development Order:**
1. ✅ Setup repository and project management
2. ✅ Backend API with mock data
3. ✅ Database setup with EF Core migrations
4. ✅ Console app for data import
5. ✅ Frontend book list and detail pages
6. ⚠️ Testing (backend + frontend)
7. ⚠️ Azure deployment
8. ✨ Advanced features (based on time and interest)

---

## 📄 License

---

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the book dataset
- GitHub Copilot for assistance with backlog planning and documentation
- The .NET and React communities for excellent documentation and resources

---

**Last Updated:** January 16, 2026
