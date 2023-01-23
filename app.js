require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/db");
const toDoRoutes = require("./routes/toDoRoutes");
const userRoutes = require("./routes/userRoutes");
const auth = require("./middleware/auth");
import cors from "cors";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "https://todo-app-mern.herokuapp.com:5000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
connectToDB();

app.use("/auth", userRoutes);
app.use("/", auth, toDoRoutes);

module.exports = app;
