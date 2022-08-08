const bcryptjs = require("bcryptjs");
const path = require("path");
const { writeFile, readFile } = require('fs').promises;
const { v4: uuidv4 } = require('uuid')

const { generateAccessToken } = require("../middlewares/auth");
const { fileExists, createDir } = require("../utils/file.utils");

const registerService = async (params, callback) => {
  try {
    if (params.username === undefined) return callback({mesage: "Username required", status: "Error"});
    if (params.firstname === undefined) return callback({mesage: "User first name required", status: "Error"});
    if (params.lastname === undefined) return callback({mesage: "User last name required", status: "Error"});

    const fileName = path.join(__dirname, "models", "user.model.json");
    let userData = [];
    if (await fileExists(fileName)) {
      userData = JSON.parse(await readFile(fileName));
      //Search for similar username already exists in the registered user
      const existingUser = userData.filter(val => val.username == params.username);
      if (existingUser.length > 0) return callback({mesage: "Username already exists. Please try different one", status: "Error"});
    }
    
    let data = {
      id: uuidv4(),
      username: params.username,
      fistname: params.firstname,
      lastname: params.lastname,
      password: params.password,
      profilepic: "",
      budgetthreshold: "0",
      category: [
        {
          id:23,
          name:"Natural gas"
        },
        {
          id:24,
          name:"Electricity"
        },
        {
          id:26,
          name:"Mobile Phone"
        },
        {
          id:27,
          name:"Home Internet"
        },
        {
          id:30,
          name:"Water"
        },
        {
          id:41,
          name:"Groceries"
        }
      ],
      currency: "",
      regdate: new Date().getTime(),
      isNew: true
    };

    userData.push(data);
    createDir(`${__dirname}/models/${data.id}`);
    const incomeFileName = path.join(__dirname, `models/${data.id}`, "income.model.json");
    const expenseFileName = path.join(__dirname, `models/${data.id}`, "expense.model.json");

    await writeFile(incomeFileName, JSON.stringify({data: [], created_at: "", updated_at: ""}));
    await writeFile(expenseFileName, JSON.stringify({data: [], created_at: "", updated_at: ""}));
    await writeFile(fileName, JSON.stringify(userData));
    callback(null)
  } catch(error) {
    console.log(error);
    callback({message: "Failed to register user", status: "Error"});
  }
};

const loginService = async (params, callback) => {
  try {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  
    if (params.username === undefined || params.username === "") return callback({mesage: "Username required", status: "Error"});

    if (params.password === undefined || params.password === "") return callback({mesage: "Password required", status: "Error"});

    if (!params.password.match(passw)) return callback({mesage: "Password must be between 6 t0 20 characters which contain at least one numeric, one uppercase and one lowercase letter.", status: "Error"});

    const fileName = path.join(__dirname, "models", "user.model.json");
    let userData = [];

    if (await fileExists(fileName))
      userData = JSON.parse(await readFile(fileName));

    //Find the user from list
    const user = userData.filter(val => val.username === params.username);
    if (user.length === 0) return callback({mesage: "Incorrect username", status: "Error"});
    const validPassword =  await bcryptjs.compare(params.password, user[0].password);
    if(!validPassword) return callback({mesage: "Incorrect password", status: "Error"})

    const token = generateAccessToken(user[0]);
    callback(null, token);
  } catch(error) {
    console.log(error);
    callback({message: "Login failed", status: "Error"});
  }
}

const updateUserSettings = async(params, callback) => {
  if (params.username === undefined) return callback({mesage: "Username required", status: "Error"});
  if (params.budgetthreshold === undefined) return callback({mesage: "Threshold amount required", status: "Error"});
  if (params.currency === undefined) return callback({mesage: "Currency required", status: "Error"});

  const fileName = path.join(__dirname, "models", "user.model.json");
  let userData = [];

  if (await fileExists(fileName))
    userData = JSON.parse(await readFile(fileName));

  const newData = userData.map(val => {
    if (val.id === params.currentUser.id) {
      val.username = params.username;
      val.budgetthreshold = params.budgetthreshold;
      val.currency = params.currency;
      if (val.isNew) val.isNew = false;
    }
    return val;
  });
  await writeFile(fileName, JSON.stringify(newData));
  callback(newData)
}

module.exports = {
  registerService,
  loginService,
  updateUserSettings
}