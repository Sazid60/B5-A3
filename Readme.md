# Library Management System

This is a backend project for managing a library. It is built using Express.js, MongoDB, Mongoose, TypeScript, and Zod for validation. The project follows the MVC (Model-View-Controller) pattern, which helps keep the code clean and organized. It includes proper schema validation, filtering features, and business logic like availability control during borrowing. The project also uses the MongoDB aggregation pipeline, Mongoose middlewares (pre/post), and includes static method for better data handling.

## Features

- Add new books
- Get all books with filter, sort, and limit options
- Get single Book
- Update Book
- Delete Book
- Borrow a book and track how many copies are left
- Aggregation Pipeline for showing Borrowed Books Summary
- Data validation using Zod
- Error handling with proper messages

## Project Structure

```
├─ .gitignore
├─ Readme.md
├─ package-lock.json
├─ package.json
├─ src
│  ├─ app.ts
│  ├─ app
│  │  ├─ config
│  │  │  └─ index.ts
│  │  ├─ controllers
│  │  │  ├─ book.controller.ts
│  │  │  └─ borrow.controller.ts
│  │  ├─ interfaces
│  │  │  ├─ book.interface.ts
│  │  │  └─ borrow.interface.ts
│  │  ├─ models
│  │  │  ├─ book.model.ts
│  │  │  └─ borrow.model.ts
│  │  └─ validators
│  │     ├─ book.zod.validator.ts
│  │     └─ borrow.zod.validator.ts
│  └─ server.ts
├─ tsconfig.json
└─ vercel.json
```

## Technology used

- **Express.js** – Framework for Node.js
- **MongoDB** – NoSQL database
- **Mongoose** – ODM to interact with MongoDB
- **TypeScript** – JavaScript with types
- **Zod** – Schema validation
- **dotenv** - Used for .env variable management
- **ts-node-dev** – Runs the TypeScript project with auto-reload during development


## How to Run This Project Locally?

1. **Clone the repository**

```bash
git clone https://github.com/Sazid60/B5-A3.git
cd B5-A3
 ```
2. **Install Dependencies**

```bash
npm install
```

3. **Add .env variables**
- create a .env fin in root directory

```
NODE_ENV= <Production | Development>
PORT= <Port Number of local host>
MONGO_URI= <Mongodb URI>

```

4. **Run The Project**

```bash
npm run dev
```