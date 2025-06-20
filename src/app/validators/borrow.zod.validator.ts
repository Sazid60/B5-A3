import { z } from "zod";

export const borrowBookZodSchema = z.object({
    book: z.string(),
    quantity: z.number(),
    dueDate: z.date()
})
