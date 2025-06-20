import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

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
    const books = await Book.find()

    console.log(books)

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books
    })
  } catch (error: any) {
    res.status(404).json({
      message: "Error Occured !",
      success: false,
      error: error
    });
  }
})