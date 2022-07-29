const { loginService } = require("../services/users.services");

const login = (req, res) => {
  const { username, password } = req.body;

  loginService({username, password}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.header("auth-token", result).status(200).send({
      message: "Success",
      data: result,
    });
  });
};

module.exports = {
  login
};