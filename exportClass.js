
const fs = require("fs");

class DataReceiver {

    constructor(path) {
      this.path = path;
    }
  

    getDataFromFile () {
      return new Promise((res, rej) => {
      fs.readFile("./data/" + this.path, "utf8", async function (err, data) {
          res(data)
          console.log(data)
            return data
      
          });
      })
      }
  
  
  }

  const  getData  = new DataReceiver("command.json")
  
  module.exports = getData;
