require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.get("/", userRoutes);
app.get("/getUsers", userRoutes);
app.post("/createUser", userRoutes);
app.post("/editUser", userRoutes);
app.get("/deleteUser/:id", userRoutes);


module.exports = app;
