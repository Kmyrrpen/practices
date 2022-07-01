import express from "express";
import dotenv from "dotenv";
import goalRouter from "./routes/goalRoutes.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";

const dotenvConfig = dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use(errorHandler);

app.listen(port, () => console.log("Server started on port " + port));
