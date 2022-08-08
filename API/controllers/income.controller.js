const { getIncomeService, addIncomeService, updateIncomeService, deleteIncomeService } = require("../services/budgi.service");

const getIncome = async(req, res) => {
  const currentUser = req.user.data;

  getIncomeService( {currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send(result);
  });
}

const incomeAdd = async(req, res) => {
  const { date, amount, type } = req.body;
  const currentUser = req.user.data;
  
  addIncomeService( {date, amount, type, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Successfully add income",
      status: "success"
    });
  });
};

const incomeUpdate = async(req, res) => {
  const { id, date, amount, type } = req.body;
  const currentUser = req.user.data;
  
  updateIncomeService( {id, date, amount, type, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Successfully update income",
      status: "success"
    });
  });
};

const incomeDelete = async(req, res) => {
  const { id } = req.body;
  const currentUser = req.user.data;
  
  deleteIncomeService( {id, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Successfully delete income",
      status: "success"
    });
  });
};

module.exports = {
  getIncome,
  incomeAdd,
  incomeUpdate,
  incomeDelete
};