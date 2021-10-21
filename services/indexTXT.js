const fs = require("fs");

const getDataFromFileTxt = () => {
var data =  fs.readFileSync("./data/OrderFile.txt", 'utf8')
  return data
}

module.exports = {
  getDataFromFileTxt,
};
