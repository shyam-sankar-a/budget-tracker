const { updateUserSettings } = require("../services/users.services");

const userSettings = (req, res) => {
  const { username, budgetthreshold, category } = req.body;
  const currentUser = req.user.data;

  updateUserSettings({username, budgetthreshold, category, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Success",
      status: "success",
      data: result,
    });
  });
};

module.exports = {
  userSettings
};