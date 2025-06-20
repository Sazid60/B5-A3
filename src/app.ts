import express, { Application, NextFunction, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());

// routes
app.use("/api/books", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Library Application");
});

// not found route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found !",
  });
});

// all other error handler except validation error and route error

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error:", error);
    res.status(400).json({
      message: "Something went Wrong From Global error handler!",
      error,
    });
  }
});

export default app;
