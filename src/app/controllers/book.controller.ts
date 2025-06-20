import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { createBookZodSchema } from "../validations/book.zod.validation";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // const zodBody = await createBookZodSchema.parseAsync(req.body);
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
