const { fiveMonthsReport, mostlySpendItemReports } = require("../services/budgi.service");

const getIncomeExpenseReport = (req, res) => {
    const currentUser = req.user.data;

    fiveMonthsReport( {currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send(result);
  });
}

const getMostlySpendExpenseReport = (req, res) => {
    const currentUser = req.user.data;

    mostlySpendItemReports( {currentUser}, (error, result) => {
    if(error) return res.status(400).send(error);

    return res.status(200).send(result);
  });
}

module.exports = {
    getIncomeExpenseReport,
    getMostlySpendExpenseReport
}