const fs = require("fs");

const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));

const createDir = async path => !!(await fs.promises.mkdir(path).catch(e => false));


module.exports = {
  fileExists,
  createDir
}