import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());

// routes
app.use("/api/books", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Library Application");
});

export default app;
