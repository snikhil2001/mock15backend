const express = require("express");
const User = require("./users.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const app = express.Router();

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(403).send({ message: "user already exists" });
  }

  const hash = await argon2.hash(password);

  await User.create({ email, password: hash, name });
  return res
    .status(201)
    .send({ message: "new user created, signup successful" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .send({ message: "user not found,please register first" });
  }

  const verifyHash = await argon2.verify(user.password, password);

  if (!verifyHash) {
    return res.status(403).send({ message: "incorrect password" });
  }

  const token = jwt.sign({ email: user.email, name: user.name }, "mock15", {});

  return res.status(203).send({ message: "user login successful", token });
});

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  return res.send({ name: user.name, email: user.email });
});

app.get("/logout", (req, res) => {
  return res.send({ message: "logout successful", token: null });
});

module.exports = app;
