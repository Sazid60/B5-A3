import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { IBook } from "../interfaces/book.interface";

export const bookRoutes = express.Router();

// create a book 
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

// get all books 
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "0" } = req.query;
    const query = filter ? { genre: filter } : {};

    const books = await Book.find(query).sort({ [sortBy as string]: sort === "asc" ? 1 : -1 }).limit(parseInt(limit as string));

    // const books = await Book.find()

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error occurred!",
      error: error.message,
    });
  }
});
