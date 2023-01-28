const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://nikhil:nikhil@cluster0.1tlw9qr.mongodb.net/mock15?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("Error in connection");
      } else {
        console.log("mongodb is connected");
      }
    }
  );
};

module.exports = connect;
