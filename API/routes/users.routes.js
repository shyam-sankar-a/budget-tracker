const express = require("express");
const { login } = require("../controllers/login.controller");
const { register } = require("../controllers/register.controller");
const { userSettings } = require("../controllers/user.settings.controller");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.put("/update-settings", userSettings);

module.exports = userRouter;