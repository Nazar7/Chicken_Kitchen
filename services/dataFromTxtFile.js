const fs = require("fs");

const sendReadedDataFromWarehouse = () => {
    return new Promise((res, rej) => {
    fs.readFile("./data/Warehouse.txt", "utf8", async function (err, warehouseData) {
      console.log(warehouseData)
        // var ordersList = data.split(/\r\n/);
        // console.log(ordersList)
        res(warehouseData)
          return warehouseData
    
        });
    })
    }

    module.exports = {
        sendReadedDataFromWarehouse
      }