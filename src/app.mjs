import cors from "cors";
import express from "express";
import swagger from "swagger-ui-express";
import docs from "../config/swaggerOptions.json" assert { type: "json" };
import errorHandler from "./controller/errorController.mjs";
import { connectDB } from "./db/db.mjs";
import authorRouter from "./routes/authorRouter.mjs";
import bookRouter from "./routes/bookRouter.mjs";
import userRouter from "./routes/userRouter.mjs";
import AppError from "./utils/appError.mjs";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Connected to the app..." });
  res.end();
});

//@ ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/api-docs", swagger.serve, swagger.setup(docs));

//@ ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`ERROR: Can't find ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    status: err.statusCode,
  });
});

app.use(errorHandler);
// Connecting to Database/MongoDB
connectDB();
export default app;
