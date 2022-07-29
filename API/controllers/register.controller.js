const bcryptjs = require("bcryptjs");
const { registerService } = require("../services/users.services");

const register = async (req, res) => {
  const { password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  req.body.password = await bcryptjs.hashSync(password, salt);
  registerService(req.body, (error) => {
    if(error) {
      return res.status(400).send(error);
    }

    return res.status(200).send({
      message: "Successfully registerd",
    });
  });
}

module.exports = { 
  register
};