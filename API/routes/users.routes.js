const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { login } = require("../controllers/login.controller");
const { register } = require("../controllers/register.controller");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

module.exports = userRouter;