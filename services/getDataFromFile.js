const fs = require("fs");

class DataReceiver {
  getDataFromFile(path) {
    return new Promise((res, rej) => {
      fs.readFile(path, "utf8", async function (err, data) {
          res(data);
         return  data
      })
    })
  }

  getDataFromInputFile(path) {
    return new Promise((res, rej) => {
      fs.readFile(path, "utf8", async function (err, data) {

        // var inputData = data.split('\r\n');
        // //  return  inputData
        //  const parsInputData = []
        //  let tableCustomers = []
        //  for (let i = 0; i <= inputData.length-1; i++) {
        //    console.log()
        //    let tableParsInputData = inputData[i].split(", ")
        //    let actionName = tableParsInputData.shift();
        //      tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
        //      let tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
        //      let [action, arg, val] = [actionName, tableCustomers, tableOrders]
        //      parsInputData.push({ action, arg, val });
        //  }
  
         return res(data);
          
      })
    })
  }
}



const getData = new DataReceiver();


module.exports = getData;
