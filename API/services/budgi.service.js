const path = require("path");
const { writeFile, readFile } = require('fs').promises;

const { fileExists } = require("../utils/file.utils");

// Income part 
const getIncomeService = async(params, callback) => {
  try {
    let currentUserIncomeData = {
      type: "doughnut",
      data: {
        datasets: [],
        labels: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        }
      }
    };
    const currentDate = new Date().getTime();
    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "income.model.json");
    const catFileName = path.join(__dirname, "models", "category.model.json");

    if (!await fileExists(fileName)) {
      callback({message: "Failed to fetch income, data file not found", status: "Error"});
    } 
    const incomeData = JSON.parse(await readFile(fileName));
    const catData = JSON.parse(await readFile(catFileName));

    const dataSets = {
      label: 'Current month income',
      data: [],
      backgroundColor: [],
      fill: true,
    };
    let totalIncome = 0;
    incomeData.data.forEach(data => {
      if(`${new Date(parseInt(data.date)).getFullYear()}-${new Date(parseInt(data.date)).getMonth() + 1}` === `${new Date(currentDate).getFullYear()}-${new Date(currentDate).getMonth() + 1}`) {
        dataSets.data.push(data.income_amount);
        totalIncome += parseFloat(data.income_amount);
        const categoryObj = catData.category.find(elem => elem.name === data.income_type);
        dataSets.backgroundColor.push(categoryObj.color);
        currentUserIncomeData.data.labels.push(data.income_type);
      }
    });
    currentUserIncomeData.data.datasets.push(dataSets);
    callback({
      message: "Successfully fetch income data",
      status: "success",
      income_total: totalIncome,
      data: currentUserIncomeData,
    });
  }catch(error) {
    console.log(error)
    callback({message: "Failed to fetch income", status: "Error"});
  }
}

const addIncomeService = async(params, callback) => {
  try {
    if (!params.date) return callback({mesage: "Date required", status: "Error"});
    if (!params.amount) return callback({mesage: "Income Amount required", status: "Error"});
    if (!params.type) return callback({mesage: "Income type required", status: "Error"});

    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "income.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to add income, data file not found", status: "Error"});
    
    const incomeData = JSON.parse(await readFile(fileName));
    incomeData.data.push({
      id: `${new Date().getTime()}`,
      date: params.date,
      income_amount: params.amount,
      income_type: params.type
    });
    incomeData.created_at = new Date().getTime();
    await writeFile(fileName, JSON.stringify(incomeData));
    callback(null);
  } catch(error) {
    console.log(error)
    callback({message: "Failed to add income", status: "Error"});
  }
}

const updateIncomeService = async(params, callback) => {
  try {
    if (!params.id) return callback({mesage: "Row id required", status: "Error"});
    if (!params.date) return callback({mesage: "Date required", status: "Error"});
    if (!params.amount) return callback({mesage: "Income Amount required", status: "Error"});
    if (!params.type) return callback({mesage: "Income type required", status: "Error"});

    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "income.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to update income, data file not found", status: "Error"});

    const incomeData = JSON.parse(await readFile(fileName));

    incomeData.data.forEach(val => {
      if (val.id === params.id) {
        foundUSer = true;
        val.date = params.date;
        val.income_amount = params.amount;
        val.income_type = params.type;
      }
    });
    incomeData.updated_at = new Date().getTime();

    await writeFile(fileName, JSON.stringify(incomeData));
    callback(null);
  } catch(error) {
    console.log(error)
    callback({message: "Failed to update income", status: "Error"});
  }
}

const deleteIncomeService = async(params, callback) => {
  try {
    if (!params.id) return callback({mesage: "Row id required", status: "Error"});

    let resultData;
    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "income.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to delete income, data file not found", status: "Error"});

    const incomeData = JSON.parse(await readFile(fileName));
    resultData = incomeData.data.filter(val => val.id !== params.id);
    incomeData.data = resultData;

    incomeData.updated_at = new Date().getTime();
    await writeFile(fileName, JSON.stringify(incomeData));
    callback(null);
  } catch(error) {
    console.log(error)
    callback({message: "Failed to delete income", status: "Error"});
  }
}

// Expense part
const getExpenseService = async(params, callback) => {
  try {
    let currentUserExpenseData = {
      type: "doughnut",
      data: {
        datasets: [],
        labels: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        }
      }
    };
    const currentDate = new Date().getTime();
    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "expense.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to fetch expense, data file not found", status: "Error"});

    const expenseData = JSON.parse(await readFile(fileName));
    const catFileName = path.join(__dirname, "models", "category.model.json");
    const catData = JSON.parse(await readFile(catFileName));

    const dataSets = {
      label: 'Current month expense',
      data: [],
      backgroundColor: [],
      fill: true,
    };
    let expenseTotal = 0;
    expenseData.data.forEach(data => {
      if(`${new Date(parseInt(data.date)).getFullYear()}-${new Date(parseInt(data.date)).getMonth() + 1}` === `${new Date(currentDate).getFullYear()}-${new Date(currentDate).getMonth() + 1}`) {
        dataSets.data.push(data.expense_amount);
        expenseTotal += parseFloat(data.expense_amount);
        const categoryObj = catData.category.find(elem => elem.name === data.expense_type);
        dataSets.backgroundColor.push(categoryObj.color);
        currentUserExpenseData.data.labels.push(data.expense_type);
      }
    });
    currentUserExpenseData.data.datasets.push(dataSets);

    callback({
      message: "Successfully fetch expense data",
      status: "success",
      expense_total: expenseTotal,
      data: currentUserExpenseData,
    });
  }catch(error) {
    console.log(error)
    callback({message: "Failed to fetch expense", status: "Error"});
  }
}

const addExpenseService = async(params, callback) => {
  try {
    if (!params.date) return callback({mesage: "Date required", status: "Error"});
    if (!params.amount) return callback({mesage: "Expense Amount required", status: "Error"});
    if (!params.type) return callback({mesage: "Expense type required", status: "Error"});

    let moneySpendData;

    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "expense.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to add expense, data file not found", status: "Error"});

    const expenseData = JSON.parse(await readFile(fileName));
    const mostMoneySpendFile = path.join(__dirname, `models/${params.currentUser.id}`, "money.spend.most.model.json");
    const catFileName = path.join(__dirname, "models", "category.model.json");
    const catData = JSON.parse(await readFile(catFileName));
    const categoryObj = catData.category.find(elem => elem.name === params.type);

    const currentYear = new Date().getFullYear();

    expenseData.data.push({
      id: `${new Date().getTime()}`,
      date: params.date,
      expense_amount: params.amount,
      expense_type: params.type
    });
    expenseData.created_at = new Date().getTime();

    if (!await fileExists(mostMoneySpendFile)) {
      moneySpendData = {
        data: [{
          year: currentYear,
          expenses: [{
            item: params.type,
            amount: parseFloat(params.amount),
            color: categoryObj.color,
          }]
        }]
      };
    } else {
      moneySpendData = JSON.parse(await readFile(mostMoneySpendFile));
      moneySpendData.data.forEach(item => {
        if (item.year === currentYear) {
          let categoryExists = false;
          item.expenses.forEach(v => {
            if (v.item === params.type) {
              v.amount = parseFloat(v.amount) + parseFloat(params.amount);
              categoryExists = true;
            }
          });
          if (!categoryExists) {
            item.expenses.push({
              item: params.type,
              amount: parseFloat(params.amount),
              color: categoryObj.color,
            });
          }
        }
      });
    }
    await writeFile(fileName, JSON.stringify(expenseData));
    await writeFile(mostMoneySpendFile, JSON.stringify(moneySpendData));
    callback(null);
  } catch(error) {
    console.log(error)
    callback({message: "Failed to add expense", status: "Error"});
  }
}

const updateExpenseService = async(params, callback) => {
  try {
    if (!params.id) return callback({mesage: "Row id required", status: "Error"});
    if (!params.date) return callback({mesage: "Date required", status: "Error"});
    if (!params.amount) return callback({mesage: "Expense Amount required", status: "Error"});
    if (!params.type) return callback({mesage: "Expense type required", status: "Error"});

    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "expense.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to update expense, data file not found", status: "Error"});
    const mostMoneySpendFile = path.join(__dirname, `models/${params.currentUser.id}`, "money.spend.most.model.json");

    const expenseData = JSON.parse(await readFile(fileName));
    const currentYear = new Date().getFullYear();
    let diff = 0;

    expenseData.data.forEach(val => {
      if (val.id === params.id) {
        val.date = params.date;
        diff = parseFloat(val.expense_amount) - parseFloat(params.amount);
        val.expense_amount = params.amount;
        val.expense_type = params.type;
      }
    });

    moneySpendData = JSON.parse(await readFile(mostMoneySpendFile));
    moneySpendData.data.forEach(item => {
      if (item.year === currentYear) {
        item.expenses.forEach(v => {
          if (v.item === params.type) {
            v.amount = (diff > 0) ? v.amount - diff : v.amount + Math.abs(diff);
          }
        });
      }
    });

    await writeFile(fileName, JSON.stringify(expenseData));
    await writeFile(mostMoneySpendFile, JSON.stringify(moneySpendData));
    callback(null);
  } catch(error) {
    console.log(error)
    callback({message: "Failed to update expense", status: "Error"});
  }
}

const deleteExpenseService = async(params, callback) => {
  try {
    if (!params.id) return callback({mesage: "Row id required", status: "Error"});

    let resultData;
    const fileName = path.join(__dirname, `models/${params.currentUser.id}`, "expense.model.json");
    const mostMoneySpendFile = path.join(__dirname, `models/${params.currentUser.id}`, "money.spend.most.model.json");
    if (!await fileExists(fileName)) callback({message: "Failed to delete expense, data file not found", status: "Error"});

    const expenseData = JSON.parse(await readFile(fileName));
    const currentYear = new Date().getFullYear();
  
    let deletedObj = expenseData.data.find(val => val.id === params.id);
    resultData = expenseData.data.filter(val => val.id !== params.id);
    expenseData.data = resultData;

    moneySpendData = JSON.parse(await readFile(mostMoneySpendFile));
    moneySpendData.data.forEach(item => {
      if (item.year === currentYear) {
        item.expenses.forEach(v => {
          if (v.item === deletedObj.expense_type) {
            v.amount = v.amount - deletedObj.expense_amount;
          }
        });
      }
    });

    await writeFile(fileName, JSON.stringify(expenseData));
    await writeFile(mostMoneySpendFile, JSON.stringify(moneySpendData));
    callback(null);
  } catch(error) {
    console.log(error)
    callback({message: "Failed to delete expense", status: "Error"});
  }
}

const getAllTransactions = async(params, callback) => {
  try {
    let targetIncomeData = [];
    let targetExpenseData = [];

    const incomeFileName = path.join(__dirname, `models/${params.currentUser.id}`, "income.model.json");
    const expenseFileName = path.join(__dirname, `models/${params.currentUser.id}`, "expense.model.json");

    if (!await fileExists(incomeFileName)) callback({message: "Failed to fetch all transaction data, income data file not found", status: "Error"});
    if (!await fileExists(expenseFileName)) callback({message: "Failed to fetch all transaction data, expense data file not found", status: "Error"});

    const incomeData = JSON.parse(await readFile(incomeFileName));
    const expenseData = JSON.parse(await readFile(expenseFileName));

    incomeData.data.forEach(inc => {
      targetIncomeData.push({
        date: `${new Date(parseInt(inc.date)).getFullYear()}-${new Date(parseInt(inc.date)).getMonth() + 1}-${new Date(parseInt(inc.date)).getDate()}`,
        type: "Income",
        amount: inc.income_amount,
        category: inc.income_type
      });
    });

    expenseData.data.forEach(exp => {
      targetExpenseData.push({
        date: `${new Date(parseInt(exp.date)).getFullYear()}-${new Date(parseInt(exp.date)).getMonth() + 1}-${new Date(parseInt(exp.date)).getDate()}`,
        type: "Expense",
        amount: exp.expense_amount,
        category: exp.expense_type
      });
    });

    let arrTransactionList = [...targetIncomeData, ...targetExpenseData];

    if (params.month) {
      arrTransactionList = arrTransactionList.filter(val => `${new Date(val.date).getFullYear()}-${new Date(val.date).getMonth() + 1}` === `${new Date(parseInt(params.month)).getFullYear()}-${new Date(parseInt(params.month)).getMonth() + 1}`);
    }

    callback({
      message: "Successfully fetch transaction data",
      status: "success",
      data: sortArrayDateDesc(arrTransactionList),
    });
  } catch(error) {
    console.log(error);
    callback({message: "Failed to get transaction history", status: "Error"});
  }
}

const getCategoryService = async(params, callback) => {
  try {
    const { catIds } = params;
    const catFileName = path.join(__dirname, "models", "category.model.json");

    const catData = JSON.parse(await readFile(catFileName));

    const resultData = (catIds.length > 0) ? fetchSpecificCategories(catIds, catData) : catData.category;
    callback({
      message: "Successfully fetch category data",
      status: "success",
      data: resultData,
    })
  } catch(error) {
    console.log(error);
    callback({message: "Failed to get category", status: "Error"});
  }
}

const fetchSpecificCategories = (idList, data) => {
  const ret = [];
  idList.forEach(val => {
    const categoryElement = data.category.find(elem => elem.id === val);
    ret.push(categoryElement);
  });
  return ret;
}

const fiveMonthsReport = async(params, callback) => {
  try {
    const currentDate = new Date().getTime();
    const fromDate = new Date().setMonth(new Date().getMonth() - 5);
    let reportData = {
      type: "line",
      data: {
        datasets: [],
        labels: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            id: 'income-axis',
            type: 'linear'
          }, {
            id: 'expense-axis',
            type: 'linear'
          }],
          xAxes: {
            type: 'time',
            min: fromDate,
            max: currentDate,
            time: {
              displayFormats: {
                  quarter: 'MMM/YYYY'
              }
            }
          }
        }
      }
    };
    const incomeFileName = path.join(__dirname, `models/${params.currentUser.id}`, "income.model.json");
    const expenseFileName = path.join(__dirname, `models/${params.currentUser.id}`, "expense.model.json");

    if (!await fileExists(incomeFileName)) callback({message: "Failed to fetch all transaction data, income data file not found", status: "Error"});
    if (!await fileExists(expenseFileName)) callback({message: "Failed to fetch all transaction data, expense data file not found", status: "Error"});

    const incomeData = JSON.parse(await readFile(incomeFileName));
    const expenseData = JSON.parse(await readFile(expenseFileName));

    //Prepare income report
    const incomeDataSets = {
      label: 'Income',
      data: [],
      backgroundColor: "#9fef9a",
      borderColor: "#101010",
      yAxisID: 'income-axis'
    };
    incomeData.data.forEach(data => {
      if(parseInt(data.date) >= fromDate && parseInt(data.date) <= currentDate) {
        incomeDataSets.data.push(data.income_amount);
      }
    });
    reportData.data.datasets.push(incomeDataSets);

    //Prepare expense report
    const expDataSets = {
      label: 'Expense',
      data: [],
      backgroundColor: "#9fef9a",
      borderColor: "#101010",
      yAxisID: 'expense-axis'
    };
    expenseData.data.forEach(data => {
      if(parseInt(data.date) >= fromDate && parseInt(data.date) <= currentDate) {
        expDataSets.data.push(data.expense_amount);
        reportData.data.labels.push(`${new Date(parseInt(data.date)).getFullYear()}/${new Date(parseInt(data.date)).getMonth() + 1}`);
      }
    });
    reportData.data.datasets.push(expDataSets);

    callback({
      message: "Successfully fetch income expense report data",
      status: "success",
      data: reportData,
    });
  } catch(error) {
    console.log(error);
    callback({message: "Failed to calculate last five months reports", status: "Error"});
  }
}

const mostlySpendItemReports = async(params, callback) => {
  try {
    let reportData = {
      type: 'bar',
      data: {
        datasets: [],
        labels: []
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    const currentYear = new Date().getFullYear();
    const moneySpendMostFileName = path.join(__dirname, `models/${params.currentUser.id}`, "money.spend.most.model.json");

    if (await fileExists(moneySpendMostFileName)) {
      const moneySpendMostData = JSON.parse(await readFile(moneySpendMostFileName));
      const data = moneySpendMostData.data.find(val => val.year === currentYear);
      const sortedExpArray = sortArrayAmount(data.expenses);
      const expenseData = sortedExpArray.slice(0,7);
      const dataSets = {
        label: 'Money spend mostly on',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      };
      expenseData.forEach(item => {
        dataSets.data.push(item.amount);
        dataSets.backgroundColor.push(item.color);
        dataSets.borderColor.push(item.color);
        reportData.data.labels.push(item.item);
      });
      reportData.data.datasets.push(dataSets);
    }

    callback({
      message: "Successfully fetch most spend item expense report data",
      status: "success",
      data: reportData,
    });
  } catch(error) {
    console.log(error);
    callback({message: "Failed to fetch mostly spent money item reports", status: "Error"});
  }
}

const sortArrayDateDesc = (array) => {  
  return array.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
}

const sortArrayAmount = (array) => {  
  return array.sort(function(a,b){
    return b.amount - a.amount;
  });
}

module.exports = {
  getIncomeService,
  addIncomeService,
  updateIncomeService,
  deleteIncomeService,
  getExpenseService,
  addExpenseService,
  updateExpenseService,
  deleteExpenseService,
  getAllTransactions,
  getCategoryService,
  fiveMonthsReport,
  mostlySpendItemReports
};