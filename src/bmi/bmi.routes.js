const express = require("express");
const Bmi = require("./bmi.model");
const authMiddleware = require("../middleware/authMiddleware");

const app = express.Router();

app.post("/", authMiddleware, async (req, res) => {
  const { height, weight } = req.body;

  const calculate = weight / (height * 3.2808);

  const createBmi = await Bmi.create({
    user: req.userId,
    height,
    weight,
    bmi: calculate,
  });

  return res.send({ yourBmi: createBmi });
});

app.get("/", authMiddleware, async (req, res) => {
  const bmi = await Bmi.find({ user: req.userId });

  return res.send({ bmi: bmi });
});

module.exports = app;
