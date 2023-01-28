const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connect = require("./config/db");
const userRouter = require("./users/users.routes");
const bmiRouter = require("./bmi/bmi.routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/bmi", bmiRouter);

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(8080, async () => {
  await connect();
  console.log("listening on http://localhost:8080");
});
