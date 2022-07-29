const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { login } = require("../controllers/login.controller");
const { register } = require("../controllers/register.controller");

const budgiRouter = express.Router();

budgiRouter.post("/login", login);
budgiRouter.post("/register", register);

module.exports = budgiRouter;