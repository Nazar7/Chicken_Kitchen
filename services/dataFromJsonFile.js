const fs = require("fs");

const getDataFromJsonFile = () => {
    return new Promise((res, rej) => {
    fs.readFile("./data/command.json", "utf8", async function (err, commandData) {
        res(commandData)
          return commandData
    
        });
    })
    }

    module.exports = {
        getDataFromJsonFile
      }

 
      