require("colors");
require("dotenv").config();

const express = require("express");
const path = require("path");
const {
  errorHandler,
  notFoundhandler,
} = require("./middleware/errorMiddleware");
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

// Send frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(notFoundhandler);
app.use(errorHandler);

app.listen(port, () => console.log("Server started on port " + port));
