import { User } from "./schema.js";
import passport from "passport";

const register = async (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    }
  );
};

const login = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
};

const submit = async (req, res) => {
  const submittedSecret = req.body.secret;

  const foundUser = await User.findById(req.user.id);

  if (foundUser) {
    foundUser.secret = submittedSecret;
    await foundUser.save();
    res.redirect("/secrets");
  } else {
    res.status(401).send("Unauthorized");
  }
};

export { register, login, submit };
