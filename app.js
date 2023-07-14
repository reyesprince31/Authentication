import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { User } from "./schema.js";

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
  res.render("register");
});

// Register a new user
app.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  const checkUser = await User.findOne({ email: req.body.username });

  if (checkUser) {
    res.render("register", {
      error: "Email is already in use",
    });
  } else {
    await newUser.save();
    res.render("secrets");
  }
});

//login authentication
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userAccess = await User.findOne({ email: username });

  if (userAccess && userAccess.password === password) {
    res.render("secrets");
  } else {
    console.log("No match found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Connected to Port " + PORT);
});
