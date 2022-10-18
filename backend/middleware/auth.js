const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return req.status(401).send("access denied.");

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send("invalid token!");
  }
};
