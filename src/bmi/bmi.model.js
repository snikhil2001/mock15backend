const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema({
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Bmi = mongoose.model("bmi", bmiSchema);

module.exports = Bmi;
