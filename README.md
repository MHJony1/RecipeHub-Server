<div align="center">


# RecipeHub — Server

### *The REST API Powering RecipeHub*

A full-stack recipe discovery and sharing platform where users can browse, search, filter, and manage recipes.
This repository contains the **backend REST API**, built with Express.js and TypeScript.

<br/>

[![API Base](https://img.shields.io/badge/🔌_API-localhost:5000%2Fapi%2Fv1-E07A2F?style=for-the-badge)](#)
[![Server Repo](https://img.shields.io/badge/GitHub-SERVER_REPO-181717?style=for-the-badge&logo=github)](https://github.com/MHJony1/RecipeHub-Server)
[![Client Repo](https://img.shields.io/badge/GitHub-CLIENT_REPO-2D2D2D?style=for-the-badge&logo=github)](https://github.com/MHJony1/RecipeHub-Client)

<br/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)
![Helmet](https://img.shields.io/badge/Helmet-security-4A4A55?style=flat-square)

</div>

---

## ✨ Features

| | |
|---|---|
| 🔐 | **Authentication** — JWT-based signup/login with secure password hashing (bcrypt) |
| 📖 | **Recipe CRUD** — Create, read, update, and delete recipes |
| 🔍 | **Filtering & Search** — Query recipes by category, difficulty, cooking time, and title |
| 🛡️ | **Protected Routes** — Middleware-based route protection for authenticated actions |
| ✅ | **Validated Requests** — Schema-based input validation with Zod |
| 📊 | **Aggregated Stats** — Endpoints powering the dashboard and platform statistics |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Language** | TypeScript (via `ts-node-dev`) |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **Validation** | Zod |
| **Security** | Helmet, CORS |
| **Logging** | Morgan |
| **Linting/Formatting** | ESLint, Prettier |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

```bash
# Clone the repository
git clone https://github.com/MHJony1/RecipeHub-Server.git
cd RecipeHub-Server

# Install dependencies
npm install
```

### Running the Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api/v1`.

---

## 📁 Project Structure

```
src/
├── config/           # Database connection & environment config
├── controllers/      # Request handlers / business logic
├── middleware/        # Auth, error handling, validation middleware
├── models/            # Mongoose schemas
├── routes/             # API route definitions
├── utils/              # Helper functions
└── index.ts             # App entry point
```

---

## 📡 API Overview

<div align="center">

| Method | Endpoint | Description |
|:---:|---|---|
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/v1/auth/register` | Register a new user |
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/v1/auth/login` | Log in and receive a JWT |
| ![GET](https://img.shields.io/badge/GET-61AFFE?style=flat-square) | `/api/v1/recipes` | Get all recipes (filters, search, pagination) |
| ![GET](https://img.shields.io/badge/GET-61AFFE?style=flat-square) | `/api/v1/recipes/slug/:slug` | Get a single recipe by slug |
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/v1/recipes` | Create a new recipe 🔒 *protected* |
| ![PATCH](https://img.shields.io/badge/PATCH-FCA130?style=flat-square) | `/api/v1/recipes/:id` | Update a recipe 🔒 *protected* |
| ![DELETE](https://img.shields.io/badge/DELETE-F93E3E?style=flat-square) | `/api/v1/recipes/:id` | Delete a recipe 🔒 *protected* |

</div>

---

## 🔗 Related Repository

This is the **server** side of RecipeHub. The corresponding frontend (Next.js client) lives here:

👉 **[RecipeHub-Client](https://github.com/MHJony1/RecipeHub-Client)**

Both repositories need to be running together for the full application to work.

---

## 📄 License

This project was built for educational/assignment purposes.

## 👤 Author

<div align="center">

**Mahmudul Hasan Jony**

[![GitHub](https://img.shields.io/badge/GitHub-MHJony1-181717?style=flat-square&logo=github)](https://github.com/MHJony1)

</div>
