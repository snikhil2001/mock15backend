const jwt = require("jsonwebtoken");
const User = require("../users/users.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).send({ message: "Please provide token" });
  }

  const verify = jwt.verify(token, "mock15");

  if (!verify) {
    return res
      .status(403)
      .send({ message: "Invalid token,please login again" });
  }

  const user = await User.findOne({ email: verify.email });

  req.userId = user._id;
  next();
};

module.exports = authMiddleware;
