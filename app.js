require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/db");
const toDoRoutes = require("./routes/toDoRoutes");
const userRoutes = require("./routes/userRoutes");
const auth = require("./middleware/auth");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDB();

app.use("/auth", userRoutes);
app.use("/", auth, toDoRoutes);

module.exports = app;
