import express, { Request, Response } from 'express';
import { createBorrowZodSchema } from '../validators/borrow.zod.validator';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';




export const borrowRoutes = express.Router()


// create a borrow 
borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const body = await createBorrowZodSchema.parseAsync(req.body)

        const existingBook = await Book.isBookExists(body.book)

        if (!existingBook) { res.status(404).json({ success: false, message: "Book Does Not Exists", data: {} }) }

        const book = await Book.findOne({ _id: body.book })

        if (book) {
            if (book.copies < body.quantity) {
                res.status(400).json({ success: false, message: "No More Books Available To Borrow!" })
            } else {
                // use of static method to update Book
                await Borrow.deductCopies(body.book, body.quantity)
                const borrow = await Borrow.create(body);
                res.status(201).json({ success: true, message: "Book borrowed successfully", data: borrow });
            }
        }
    } catch (error: any) {
        res.status(400).json(
            {
                message: "Validation failed", success: false,
                error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error
            })
    }
})

// get borrowed Books Summary

borrowRoutes.get("/", async (req: Request, res: Response) => {

    try {

        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfos",
                },
            },
            {
                $unwind: "$bookInfos",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfos.title",
                        isbn: "$bookInfos.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ])

        // console.log(summary)

        res.status(201).json({ success: true, message: "Borrowed books summary retrieved successfully", data: summary });

    } catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve borrowed books summary",
            success: false,
            error: error?.message || error,
        });
    }
})