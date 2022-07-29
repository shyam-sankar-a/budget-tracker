const bcryptjs = require("bcryptjs");
const path = require("path");
const { writeFile, readFile } = require('fs').promises;
const { uuid } = require('uuidv4');

const { generateAccessToken } = require("../middlewares/auth");

const registerService = async (params, callback) => {
  if (params.username === undefined) return callback({mesage: "Username required", status: "Error"});

  const fileName = path.join(__dirname, "models", "user.model.json");
  const userData = JSON.parse(await readFile(fileName));
  
  //Search for similar username already exists in the registered user
  const existingUser = userData.filter(val => val.username == params.username);
  if (existingUser.length > 0) return callback({mesage: "Username already exists. Please try different one", status: "Error"});
  
  userData.push({...params, id: uuid()});
  await writeFile(fileName, JSON.stringify(userData));
  callback(null)
};

const loginService = async (params, callback) => {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  
  if (params.username === undefined || params.username === "") return callback({mesage: "Username required", status: "Error"});

  if (params.password === undefined || params.password === "") return callback({mesage: "Password required", status: "Error"});

  if (!params.password.match(passw)) return callback({mesage: "Password must be between 6 t0 20 characters which contain at least one numeric, one uppercase and one lowercase letter.", status: "Error"});

  const fileName = path.join(__dirname, "models", "user.model.json");
  const userData = JSON.parse(await readFile(fileName));

  //Find the user from list
  const user = userData.filter(val => val.username === params.username);
  if (user.length === 0) return callback({mesage: "Incorrect username", status: "Error"});
  const validPassword =  await bcryptjs.compare(params.password, user[0].password);
  if(!validPassword) return callback({mesage: "Incorrect password", status: "Error"})

  const token = generateAccessToken(user[0]);
  callback(null, token);
}

module.exports = {
  registerService,
  loginService
}