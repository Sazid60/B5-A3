import { model, Schema } from "mongoose";
import { IBorrowBooks } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<IBorrowBooks>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Book ID is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be a positive integer"],
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Borrow = model("Borrow", borrowSchema)