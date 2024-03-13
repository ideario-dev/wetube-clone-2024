import User from "../models/user.js";
import bcrypt from "bcrypt";
const pageTitle = "Login";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: `Password confirmation doesn't match`,
    });
  }
  const Exists = await User.exists({ $or: [{ username }, { email }] });
  if (Exists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: `This username/email is already taken`,
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "join",
      errorMessage: error._message,
    });
  }
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove user");

export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("see");

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const exists = await User.exists({ username });
  if (!exists) {
    return res
      .status(400)
      .render("login", { errorMessage: "Username is not exist" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  console.log("LOGIN USER IN! COMING SOON!");
  return res.redirect("/");
};
