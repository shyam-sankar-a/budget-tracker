const { getAllTransactions } = require("../services/budgi.service"); 

const txnHistoryGet = async(req, res) => {
  const { month } = req.params || "";
  const currentUser = req.user.data;
  
  getAllTransactions( {month, currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send(result);
  });
};

module.exports = {
  txnHistoryGet
};