const fs = require("fs");

const sendReadedData = () => {
return new Promise((res, rej) => {
fs.readFile("./input/InputData.txt", "utf8", async function (err, data) {
    var ordersList = data.split('\r\n');
    console.log(ordersList)
    res(ordersList)
      return ordersList

    });
})
}
module.exports = {
    sendReadedData, 

  }