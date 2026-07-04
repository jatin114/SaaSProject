# 🚀 TeamFlow

> **A production-ready multi-tenant SaaS project management platform built with NestJS, Prisma, PostgreSQL, and React.**

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![Backend](https://img.shields.io/badge/backend-NestJS-red)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748)
![Authentication](https://img.shields.io/badge/Auth-JWT-success)
![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Swagger Documentation](#-swagger-documentation)
- [Backend Modules](#-backend-modules)
- [Database](#-database)
- [Authentication Flow](#-authentication-flow)
- [Role Based Access Control](#-role-based-access-control)
- [Security Features](#-security-features)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 📖 Overview

**TeamFlow** is a modern **multi-tenant SaaS project management platform** designed for teams and organizations to collaborate efficiently.

The backend follows production-oriented architecture with secure authentication, role-based authorization, modular design, centralized exception handling, validation, API documentation, and scalable database design.

The project is being developed as a real-world SaaS application rather than a tutorial project.

---

## ✨ Key Features

### 🔐 Authentication

- JWT Authentication
- Refresh Token Rotation
- Secure Password Hashing (bcrypt)
- User Registration
- Login
- Profile API
- Change Password
- Protected Routes

---

### 👥 Organization Management

- Multi-Tenant Architecture
- Organization Creation
- Invite Members
- Remove Members
- Role Management

---

### 👤 Role Based Access Control (RBAC)

Supported Roles

- OWNER
- ADMIN
- MANAGER
- MEMBER

Permissions are enforced using custom Guards and Decorators.

---

### 📁 Project Management

- Create Projects
- List Projects
- Delete Projects
- Search
- Pagination

---

### ✅ Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Users
- Priority Management
- Status Management
- Filtering
- Pagination

---

### 💬 Comments

- Create Comment
- View Comments
- Delete Comment

---

### 🔔 Notifications

- User Notifications
- Mark as Read
- Mark All as Read
- Unread Count

---

### 📜 Activity Logs

- User Activity Tracking
- Search
- Pagination
- Filtering

---

### 🛡 Security

- JWT Authentication
- Role Guards
- Validation Pipe
- Helmet
- CORS
- Global Exception Filter
- Global Response Interceptor
- Environment Validation

---

### 📘 Developer Experience

- Swagger Documentation
- DTO Validation
- Prisma ORM
- Modular Architecture
- Clean Folder Structure
- Reusable Components
- RESTful APIs

---

## 🛠 Tech Stack

### Backend

- NestJS 11
- TypeScript
- Prisma ORM
- PostgreSQL

### Authentication

- JWT
- Passport
- bcrypt

### Validation

- class-validator
- class-transformer
- Joi

### Documentation

- Swagger / OpenAPI

### Security

- Helmet
- CORS

### Development Tools

- ESLint
- Prettier
- Git
- GitHub

---

## 📊 Current Project Status

### Backend

✅ Completed

### Frontend

🚧 In Progress

### Deployment

📅 Planned

### Real-time Notifications

📅 Planned

### Docker

📅 Planned

### CI/CD

📅 Planned

---

## 🎯 Project Goals

- Build a production-ready SaaS application
- Follow industry-standard architecture
- Implement secure authentication
- Design scalable APIs
- Create a modern React frontend
- Deploy on cloud infrastructure
- Continuously improve through production-grade features

---

> **This project is under active development. New features and improvements are added regularly.**

---

# 🏗️ System Architecture

```text
                    React Frontend
                           │
                           │ REST API
                           ▼
                 NestJS Backend (v1)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     Authentication     Business Logic     Swagger
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                      Prisma ORM
                           │
                           ▼
                     PostgreSQL Database
```

---

# 📂 Project Structure

```text
SaaSProject/
│
├── README.md
├── .gitignore
│
├── teamflow-backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts (Planned)
│   │
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── comments/
│   │   ├── notifications/
│   │   ├── activity-logs/
│   │   ├── health/
│   │   ├── prisma/
│   │   ├── common/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── teamflow-frontend/
    └── (Coming Soon)
```
---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/jatin114/SaaSProject.git
```

Move into backend

```bash
cd SaaSProject/teamflow-backend
```

Install dependencies

```bash
npm install
```

Create environment file

Create a `.env` file by copying `.env.example`.

```bash
cp .env.example .env
```

> Windows users can manually create a `.env` file and copy the contents from `.env.example`.

Update your environment variables.

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Start development server

```bash
npm run start:dev
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET | Access token secret |
| JWT_REFRESH_SECRET | Refresh token secret |
| PORT | Server port |

---

# ▶️ Available Scripts

| Command | Description |
|---------|-------------|
| npm run start:dev | Run development server |
| npm run build | Build application |
| npm run start:prod | Run production build |
| npm run test | Run unit tests |
| npm run lint | Run ESLint |

---

# 📘 Swagger Documentation

After starting the server

```
http://localhost:3000/api
```

API Version

```
http://localhost:3000/v1
```

Swagger includes

- Authentication
- Users
- Organizations
- Projects
- Tasks
- Comments
- Notifications
- Activity Logs
- Health

---

# 📦 Backend Modules

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Users | ✅ |
| Organizations | ✅ |
| Projects | ✅ |
| Tasks | ✅ |
| Comments | ✅ |
| Notifications | ✅ |
| Activity Logs | ✅ |
| Health | ✅ |

---

# 🗄️ Database

Database

- PostgreSQL

ORM

- Prisma

Authentication

- JWT

Password Storage

- bcrypt hash

Refresh Token Storage

- Session table

---

# 🔐 Authentication Flow

```text
Register
    │
    ▼
User Created
    │
    ▼
Login
    │
    ▼
Access Token (15 min)
Refresh Token (7 days)
    │
    ▼
Protected APIs
    │
    ▼
Access Token Expired
    │
    ▼
Refresh Token
    │
    ▼
New Access Token
```

---

# 👥 Role Based Access Control

| Role | Permissions |
|------|-------------|
| OWNER | Full access |
| ADMIN | Manage users and projects |
| MANAGER | Manage assigned projects and tasks |
| MEMBER | Assigned work only |

---

# 🛡 Security Features

- JWT Authentication
- Refresh Token Rotation
- Password Hashing (bcrypt)
- Global Exception Filter
- Global Response Interceptor
- Helmet
- CORS
- DTO Validation
- Environment Validation
- Protected Routes
- Role Guards

---

# 🚀 Future Roadmap

## Backend

- Email Verification
- Forgot Password
- Reset Password
- Two-Factor Authentication
- Email Notifications
- Rate Limiting
- Redis
- Background Jobs
- Docker Support

## Frontend

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Responsive Dashboard
- Charts
- Dark Mode

## DevOps

- Docker
- GitHub Actions
- CI/CD
- Railway Deployment
- AWS Deployment

---

# 🤝 Contributing

Contributions, issues and feature requests are welcome.

If you would like to improve TeamFlow, feel free to fork the repository and submit a pull request.

---

# 👨‍💻 Author

**Jatin Vashishtha**

Frontend Developer | React | NestJS | Prisma | PostgreSQL

---

# 📄 License

This repository is currently **UNLICENSED**.

The source code is publicly visible for learning and portfolio purposes but may not be copied, modified, or redistributed without permission.

---

# ⭐ Project Status

🚧 **Actively Developing**

Current Version

```
v1.0.0-beta
```

Backend Progress

```
████████████████████ 100%
```

Frontend Progress

```
██░░░░░░░░░░░░░░░░░░ 10%
```

Overall Project

```
██████████░░░░░░░░░ 55%
```

---

If you found this project useful, consider giving it a ⭐ on GitHub.