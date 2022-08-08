const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/app.config")

const authenticateToken = (req, res, next) => {
  const token = req.header("jwt");

  if(token == null) return res.status(401).send({message: "Access Denied", status: "Error"});

  try {
    if(token.startsWith('Bearer')) {
      //Remove Bearer from string
      token = token.slice(7,token.length).trimmedLeft();
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if(err) return res.status(403).send({message: "Access Forbidden", status: "Error"});
      req.user = user;
      next();
    });
  } catch(err) {
    return res.status(400).send({message: "Invalid Token", status: "Error"});
  }
};

const generateAccessToken = (userData) => {
  return jwt.sign({data: userData}, JWT_SECRET_KEY, {
    expiresIn: "24h"
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken
}
