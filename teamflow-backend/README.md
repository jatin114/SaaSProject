# 🚀 TeamFlow

A modern multi-tenant SaaS project management platform built with **NestJS**, **Prisma**, and **PostgreSQL**.

TeamFlow allows organizations to manage projects, tasks, comments, notifications, and team members with secure JWT authentication and role-based access control.

---

# ✨ Features

- Multi-Tenant Architecture
- JWT Authentication
- Refresh Token Authentication
- Role Based Access Control (OWNER, ADMIN, MANAGER, MEMBER)
- Organization Management
- Project Management
- Task Management
- Comments
- Notifications
- Activity Logs
- Pagination
- Search & Filtering
- Swagger API Documentation
- Global Exception Handling
- Global Response Interceptor
- Health Check Endpoint
- Helmet Security
- CORS
- Environment Validation

---

# 🛠 Tech Stack

Backend

- NestJS 11
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport
- Swagger
- Joi
- Helmet

Validation

- class-validator
- class-transformer

Database

- PostgreSQL

---

# 📂 Project Structure

src/

├── auth/

├── users/

├── organizations/

├── projects/

├── tasks/

├── comments/

├── notifications/

├── activity-logs/

├── prisma/

├── common/

│ ├── decorators/

│ ├── dto/

│ ├── filters/

│ ├── interceptors/

│ ├── interfaces/

│ └── utils/

└── main.ts

---

# ⚙ Installation

Clone repository

```bash
git clone https://github.com/jatin114/SaaSProject.git
```

Install dependencies

```bash
npm install
```

Create .env

```env
DATABASE_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=

PORT=3000
```

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Run application

```bash
npm run start:dev
```

---

# 📚 Swagger

After running the project:

http://localhost:3000/api

---

# ❤️ Authentication

Uses

- Access Token
- Refresh Token
- JWT Authentication
- Passport Strategy

---

# 📦 API Modules

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

# 🔒 Security

- JWT Authentication
- Role Guards
- Helmet
- Validation Pipe
- Global Exception Filter
- Environment Validation
- CORS

---

# 📜 Available Scripts

```bash
npm run start:dev

npm run build

npm run start:prod

npm run test

npm run lint
```

---

# 🚀 Future Roadmap

- React Frontend
- Socket.io
- Email Notifications
- File Uploads
- Docker
- CI/CD
- Redis Cache
- Background Jobs
- API Versioning
- Rate Limiting

---

# 👨‍💻 Author

Jatin Vashishtha

---

# 📄 License

This project is licensed under the MIT License.