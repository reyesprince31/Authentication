import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { register, login } from "./routes.js";

const PORT = process.env.PORT;
const app = express();

// Use middleware to parse URL encoded data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register", {
    message: "Enter New User",
  });
});

app.post("/register", register);

app.post("/login", login);

// Start the server
app.listen(PORT, () => {
  console.log("Connected to Port " + PORT);
});
