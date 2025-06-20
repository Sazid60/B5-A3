import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: [true, "Title Is Required"] },
    author: { type: String, required: [true, "Author Is Required"] },

    genre: {
      type: String,
      required: [true, "Genre Is Required"],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "{VALUE} Is Not A Valid Genre",
      },
    },
    isbn: { type: String, required: [true, "isbn Is Required"], unique: true },
    description: { type: String, default: "" },
    copies: {
      type: Number,
      required: [true, "Copies Area Required"],
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
