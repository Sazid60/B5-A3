# Library Management System

This is a backend project for managing a library. It is built using Express.js, MongoDB, Mongoose, TypeScript, and Zod for validation. The project follows the MVC (Model-View-Controller) pattern, which helps keep the code clean and organized. It includes proper schema validation, filtering features, and business logic like availability control during borrowing. The project also uses the MongoDB aggregation pipeline, Mongoose middlewares (pre/post), and includes static method for better data handling.

#### Like Link :

#### Video Instruction Link


### Features

- Add new books
- Get all books with filter, sort, and limit options
- Get single Book
- Update Book
- Delete Book
- Borrow a book and track how many copies are left
- Aggregation Pipeline for showing Borrowed Books Summary
- Data validation using Zod
- Error handling with proper messages

### Project Structure

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

### Technology used

- **Express.js** – Framework for Node.js
- **MongoDB** – NoSQL database
- **Mongoose** – ODM to interact with MongoDB
- **TypeScript** – JavaScript with types
- **Zod** – Schema validation
- **dotenv** - Used for .env variable management
- **ts-node-dev** – Runs the TypeScript project with auto-reload during development


### How to Run This Project Locally?

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
## API Endpoint Explanation

#### Create Book

- Method : POST
- Endpoint URL: /api/books

```
https://b5-a3-sazid.vercel.app/api/books
```

- Data Inside Body:

```json
{
  "title": "Steve Jobs",
  "author": "Walter Isaacson",
  "genre": "SCIENCE",
  "isbn": "9781451648539",
  "description": "A comprehensive biography of the Apple co-founder based on interviews and insider accounts.",
  "copies": 6,
  "available": true
}

```

- If we hit with this data book data inside body It will create the book with unique isbn number and send a success response. If any validation error or duplication occurs it will show error and will also show duplicate data error.

#### Get All Books

- Method : GET 
- Endpoint URL: /api/books

```
https://b5-a3-sazid.vercel.app/api/books
```

- If we hit this url it will show all the book data. 

```
https://b5-a3-sazid.vercel.app/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

- Here we can do filtering sorting and limiting. By default the data is limited by 10 data.
- The sorting is done based on createdAt descending order
- Filtering is done based on `genre` field of book



#### Get Book by ID

- Method : GET 
- Endpoint URL: /api/books/:bookId

```
https://b5-a3-sazid.vercel.app/api/books/6856ae72cc2dae1d909abd35
```
**Change The Id**

- If we hit this url it will show the book we have targeted. 
- If the id is not valid it will show cast error.
- If the book do not exist it will show error that book do not exists. 


#### Update Book

- Method : PUT
- Endpoint URL: /api/books/:bookId

```
https://b5-a3-sazid.vercel.app/api/books/6856ae72cc2dae1d909abd35
```
**Change The Id**

- Data Inside Body  : 

```json
{
  "copies": 50
}
```
- We can update any field like this.
- Validation will work here we can not put anything which do not meet validation rules.
- Validation error, cast error, route error and non existing data error will  show if any error happens. 


#### Delete Book

- Method : DELETE 
- Endpoint URL: /api/books/:bookId 

```
https://b5-a3-sazid.vercel.app/api/books/6856ae72cc2dae1d909abd35
```
**Change The Id**

- If we hit this api with proper id it will delete the data from the database
- Cast error, route error and non existing data error will  show if any error happens. 


#### Borrow a Book

- Method : POST 
- Endpoint URL: /api/borrow

```
https://b5-a3-sazid.vercel.app/api/borrow
```
- Data Inside Body  : 

```json
{
  "book": "6856b8cff3d90b2e6ef0f31c",
  "quantity": 1,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
**Change The book Id**

- A book can be borrowed by hitting this api. 
- There are some business logic like If quantity is less than the books copies then only a book can be borrowed
- If Book Is Borrowed the copies from the book will be reduced
- If The Book Quantity Becomes 0 the available status will be false. 



#### Borrowed Books Summary (Using Aggregation)

- Method : GET 
- Endpoint URL: /api/borrow

```
https://b5-a3-sazid.vercel.app/api/borrow
```

- The borrow data is grouped by book ID.

- It calculates the total borrowed quantity for each book.

- hen it uses $lookup to populate the book's details (title and ISBN) from the books collection.

