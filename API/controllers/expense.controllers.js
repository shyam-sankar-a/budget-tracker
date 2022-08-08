const { addExpenseService, updateExpenseService, deleteExpenseService, getExpenseService } = require("../services/budgi.service");

const getExpense = async(req, res) => {
  const currentUser = req.user.data;

  getExpenseService( {currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send(result);
  });
}

const expenseAdd = async(req, res) => {
  const { date, amount, type } = req.body;
  const currentUser = req.user.data;
  
  addExpenseService( {date, amount, type, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Successfully add expense",
      status: "success",
      data: result,
    });
  });
};

const expenseUpdate = async(req, res) => {
  const { id, date, amount, type } = req.body;
  const currentUser = req.user.data;
  
  updateExpenseService( {id, date, amount, type, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Successfully update expense",
      status: "success",
      data: result,
    });
  });
};

const expenseDelete = async(req, res) => {
  const { id } = req.body;
  const currentUser = req.user.data;
  
  deleteExpenseService( {id, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send({
      message: "Successfully delete expense",
      status: "success",
      data: result,
    });
  });
};

module.exports = {
  getExpense,
  expenseAdd,
  expenseUpdate,
  expenseDelete
};