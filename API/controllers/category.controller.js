const { getCategoryService } = require("../services/budgi.service");

const getCategory = (req, res) => {
  const { catIds } = req.body;
  getCategoryService( { catIds }, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send(result);
  });
}

module.exports = {
  getCategory
}