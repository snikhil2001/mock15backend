const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
