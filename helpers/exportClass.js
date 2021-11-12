const fs = require("fs");

class DataReceiver {
  getDataFromFile(path) {
    return new Promise((res, rej) => {
      fs.readFile("./data/" + path, "utf8", async function (err, data) {
          res(data);
         return  data
      })
    })
  }
}

const getData = new DataReceiver();

module.exports = getData;
