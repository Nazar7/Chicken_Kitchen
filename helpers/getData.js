const { getDataFromFile } = require("../services/index.js");

const { getDataFromJsonFile } = require("../services/dataFromJsonFile");

const fs = require("fs");


// class DataReceiver {

//   constructor(path) {
//     this.path = path;
//   }


//   getDataFromFile () {
//     return new Promise((res, rej) => {
//     fs.readFile("./data/" + path, "utf8", async function (err, data) {
//         res(data)
//           return data
    
//         });
//     })
//     }

//   // sayHi() {
//   //   alert(this.name);
//   // }

// }




// const getDataFromCommandFile = () => {
//   return new Promise((res, rej) => {
//   fs.readFile("./data/command.json", "utf8", async function (err, commandData) {
//       res(commandData)
//         return commandData
  
//       });
//   })
//   }

  // const sendReadedDataFromWarehouse = () => {
  //   return new Promise((res, rej) => {
  //   fs.readFile("./data/Warehouse.txt", "utf8", async function (err, warehouseData) {
 
  //       res(warehouseData)
  //         return warehouseData
    
  //       });
  //   })
  //   }

  //   module.exports = {
  //       sendReadedDataFromWarehouse
  //     }


// const getWarehouseList = async () => (
//   await getDataFromFile("./data/Warehouse.txt")
// );

const getFoodIngredientsList = async () => (
    await getDataFromFile("./data/FoodIngredients.csv")
  );


  const getBaseIngredientsList = async () => await getDataFromFile(
    "./data/BaseIngredientList.csv"
  ).then((data) => {
    return data[0].ingredients.split(",");
  });


  const getCustomerAllergieProductsList = async () => (
    await getDataFromFile("./data/RegularCustomersAllergies.csv")
    )
  


  const getBaseIngredientsPricesList = async () =>  (
    await getDataFromFile("./data/BaseIngridientsPrice.csv")
  );


  const getCustomersBudgetsList =  async () =>  (
    await getDataFromFile("./data/RegularCustomerBudget.csv")
  );


  module.exports = {
    getBaseIngredientsList,
    getFoodIngredientsList,
    getCustomerAllergieProductsList,
    getBaseIngredientsPricesList,
    getCustomersBudgetsList,

  }

