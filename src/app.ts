import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

// routes

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Library Application");
});

export default app;
