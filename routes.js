import bcrypt from "bcrypt";
import { User } from "./schema.js";

const saltRounds = 10;

const register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    email: username,
    password: hash,
  });

  try {
    const checkUser = await User.findOne({ email: username });

    if (checkUser) {
      res.render("register", {
        message: "Email is already in use",
      });
    } else {
      await newUser.save();
      res.render("secrets");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.render("register", {
        message: error.errors.email[0],
      });
    } else {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userAccess = await User.findOne({ email: username });

  if (userAccess) {
    const match = await bcrypt.compare(password, userAccess.password);
    if (match) {
      res.render("secrets");
    } else {
      res.status(401).send("Incorrect username or password");
    }
  } else {
    res.status(404).send("User not found");
  }
};

export { register, login };
