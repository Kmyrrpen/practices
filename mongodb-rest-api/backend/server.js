require("colors");
require("dotenv").config();

const express = require("express");
const { errorHandler, notFoundhandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");

const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.use(notFoundhandler);
app.use(errorHandler);

app.listen(port, () => console.log("Server started on port " + port));
