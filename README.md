# Scalable Node.js Backend Architecture

A robust, enterprise-ready Node.js backend template built with **TypeScript**, **Express**, and **Mongoose**. This project follows best practices for scalability, maintainability, and security.

## 🚀 Features

- **TypeScript**: Typed development for better developer experience and fewer bugs.
- **JWT Authentication**: Secure access and refresh token pattern with rotating keys.
- **API Key Security**: Middleware to validate API keys for protected routes.
- **Request Validation**: Schema-based validation using **Zod**.
- **Centralized Error Handling**: Custom error classes and a unified error-handling middleware.
- **Async Handler**: Error-safe async/await logic in Express routes.
- **Logging**: Advanced logging with **Winston** (console and daily rotating files).
- **ES Modules**: Fully compatible with Node.js ESM.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Authentication**: Jsonwebtoken (JWT)
- **Utilities**: Bcryptjs, Cookie-parser, Cors, Dotenv

## 📂 Project Structure

```text
src/
├── auth/           # Authentication & Authorization logic
├── controllers/    # Route controllers
├── core/           # Core utilities (JWT, Custom Errors)
├── database/       # Database connection and seeding
├── helper/         # Helper functions (AsyncHandler, Validator)
├── middleware/     # Express middlewares
├── models/         # Mongoose models
├── routes/         # Express routes
├── schema/         # Zod validation schemas
├── types/          # Custom TypeScript type definitions
└── config.ts       # Global configuration management
```

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (refer to `.env.example`).
   ```env
   PORT=8080
   DB_HOST=localhost
   DB_PORT=27017
   DB_NAME=todo
   TOKEN_SECRET=your_secret_key
   TOKEN_ISSUER=todo-backend
   TOKEN_AUDIENCE=todo-frontend
   ```

4. **Seed API Key** (optional):
   ```bash
   pnpm create:apiKey
   ```

5. **Start Development Server**:
   ```bash
   pnpm dev
   ```

## 📜 Available Scripts

- `pnpm dev`: Starts the development server with watch mode.
- `pnpm build`: Compiles TypeScript to JavaScript (Dist folder).
- `pnpm start`: Runs the compiled JavaScript from the Dist folder.
- `pnpm create:apiKey`: Seeds an initial API key into the database.

## 🔒 Security Practices

- **Token Rotation**: Uses `accessToken` and `refreshToken` with unique keys stored in a `KeyStore`.
- **Hashed Passwords**: Uses `bcryptjs` for secure password storage.
- **Structured Validation**: All incoming requests are validated against schemas before reaching controllers.
- **Error Obfuscation**: Detailed error stacks are hidden in production to prevent leakage.
