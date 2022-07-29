const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/app.config")

const authenticateToken = (req, res, next) => {
  const token = req.header("authorization");

  if(token == null) return res.status(401).send("Access Denied");

  try {
    if(token.startsWith('Bearer')) {
      //Remove Bearer from string
      token = token.slice(7,token.length).trimmedLeft();
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if(err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch(err) {
    res.status(400).send("Invalid Token");
  }
};

const generateAccessToken = (userData) => {
  return jwt.sign({data: userData}, JWT_SECRET_KEY, {
    expiresIn: "3h"
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken
}
