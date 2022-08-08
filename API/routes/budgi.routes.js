const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { incomeAdd, incomeUpdate, incomeDelete, getIncome } = require("../controllers/income.controller");
const { expenseAdd, expenseUpdate, expenseDelete, getExpense } = require("../controllers/expense.controllers");
const { txnHistoryGet } = require("../controllers/txn.history.controllers");
const { getCategory } = require("../controllers/category.controller");
const { getIncomeExpenseReport, getMostlySpendExpenseReport } = require("../controllers/income.expense.report.controller");

const budgiRouter = express.Router();

budgiRouter.get("/get-income", authenticateToken, getIncome);
budgiRouter.post("/add-income", authenticateToken, incomeAdd);
budgiRouter.put("/update-income", authenticateToken, incomeUpdate);
budgiRouter.delete("/delete-income", authenticateToken, incomeDelete);

budgiRouter.get("/get-expense", authenticateToken, getExpense);
budgiRouter.post("/add-expense", authenticateToken, expenseAdd);
budgiRouter.put("/update-expense", authenticateToken, expenseUpdate);
budgiRouter.delete("/delete-expense", authenticateToken, expenseDelete);

budgiRouter.get("/get-txn-history", authenticateToken, txnHistoryGet);
budgiRouter.get("/get-txn-history/:month", authenticateToken, txnHistoryGet);

budgiRouter.get("/get-category", authenticateToken, getCategory);

budgiRouter.get("/get-income-expense-report", authenticateToken, getIncomeExpenseReport);

budgiRouter.get("/get-spend-most-expense-report", authenticateToken, getMostlySpendExpenseReport);
module.exports = budgiRouter;