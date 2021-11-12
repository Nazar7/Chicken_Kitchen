const fs = require("fs");

// import { getData } from './helpers/exportClass.js'

const getData  = require("./helpers/exportClass")
const getDataFromCsv  = require("./helpers/getDataFromCsvFile")
const getCustomersDatas = require("./dataHandlers/customersData")



// getData.getDataFromFile("command.json")
// getData.getDataFromFile("InputData.txt")

// const orderedProducts = getData.getDataFromFile("Warehouse.txt")
// console.log(orderedProducts)



// import {getData} from './dataHandlers/classHelpers'

// getData.getDataFromFile();

// const {DataReceiver} = require ('./dataHandlers/classHelpers')

// new DataReceiver().sayHi();


const {
    getBaseIngredientsList,
    getFoodIngredientsList,
    getCustomerAllergieProductsList,
    getBaseIngredientsPricesList,
    getCustomersBudgetsList,
    getCommandsList
} = require("./helpers/getData")

const {
  getBuyAction,
  getTableAction,
  getOrderAction,
  getBudgetAction,
  getAuditAction
  } = require("./helpers/actionFunctions.js")

const {
    getParseCustomersAllergiesProducts,
    getParsedCustomersBudgets
  } = require("./dataHandlers/handleCustomersData")

const {
    getFoodIngredients,
  } = require("./dataHandlers/handleDishData")

const {
    getBaseIngridientsOfOrder,
  } = require("./dataHandlers/handleOrderData")

const {
    getParseInputData,
  } = require("./dataHandlers/handleInputData")

const {
    getParseWarehousData,
    getWarehousStockAfterOrder
  } = require("./dataHandlers/handleWarehousData")

const {
  sendReadedData,
} = require("./services/dataFromInputFile.js")

const {
  sendReadedDataFromWarehouse,
} = require("./services/dataFromWarehouseFile.js")

// const {
//   getDataFromJsonFile,
// } = require("./services/dataFromJsonFile");
// const { get } = require("http");


const res =  async (sendReadedData,sendReadedDataFromWarehouse) => {

  const allergiData = await getData.getDataFromFile("RegularCustomersAllergies.csv")
  // console.log(allergiData)
  const warehousData = await getData.getDataFromFile("Warehouse.txt")
  const comandList = await getData.getDataFromFile("command.json")
  const custommersAllergis = await getDataFromCsv.getDataFromFile("RegularCustomersAllergies.csv")
  

  // const custommersAllergiList = getCustomersDatas.getParseAllergiesData(allergiData)
  // console.log(custommersAllergiList)
  

  // console.log(d)

  // console.log(warehousData)
  // getData.getDataFromFile("command.json")
  // getData.getDataFromFile("InputData.txt")
  // getData.getDataFromFile("Warehouse.txt")

  // const orderedProducts = getData.getDataFromFile("InputData.txt")



  // const comandList = await getDataFromJsonFile()
  // console.log(comandList)
  const ordersList = await sendReadedData()


  // const warehousData = await sendReadedDataFromWarehouse()

  const parsedInputData = getParseInputData(ordersList)

  const parsedWarehouseStock = getParseWarehousData(warehousData)

  
  let restaurantBudget = 500;
  var resultData = [];
  resultData.push("Restaurant budget: " + restaurantBudget);
  let newRestaurantBudget = restaurantBudget;
  let newParsedWarehouseStock = []
  newParsedWarehouseStock.push(parsedWarehouseStock)
  let auditList = []
  let auditResult = []
  for (let i = 0; i <= parsedInputData.length-1; i++) {
    let customer = "";
    let orderr = "";
    let data = parsedInputData[i]
    
    const foodIngredients = await getFoodIngredientsList()

    const baseIngredients = await getBaseIngredientsList()
  
    const customerAllergieProducts = await getCustomerAllergieProductsList(customer)
  
   
    const ingredientsPrices = await getBaseIngredientsPricesList()
  
    const customersBudgets = await getCustomersBudgetsList()

    

 


    const parsedCustomersAllergiesProducts = getParseCustomersAllergiesProducts(customerAllergieProducts)


    if(newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg[0] === "="){
      let result = getBudgetAction(data, newParsedWarehouseStock)
      newRestaurantBudget = result[1]
      resultData.push(result.join(""))
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg[0] === "+") {
    
      let result = getBudgetAction(data, newParsedWarehouseStock)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg[0] === "-") {
   
      let result = getBudgetAction(data, newParsedWarehouseStock)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Table') {
      let res = getTableAction(
        data,
        i,
        orderr,
        getFoodIngredients,
        foodIngredients,
        baseIngredients,
        customersBudgets,
        ingredientsPrices,
        customerAllergieProducts,
        getBaseIngridientsOfOrder,
        newRestaurantBudget,
        parsedWarehouseStock,
        newParsedWarehouseStock
        )
        let customersOrderData = res[2].join("\n")
        resultData.push(res[1], customersOrderData)
   
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Buy') {
      let res = getBuyAction(
        data,
        i,
        orderr,
        getFoodIngredients,
        foodIngredients,
        baseIngredients,
        customersBudgets,
        ingredientsPrices,
        getBaseIngridientsOfOrder,
        newRestaurantBudget,
        customerAllergieProducts,
        ...newParsedWarehouseStock
        )
        resultData.push(res.resultOfOrder)
         newRestaurantBudget = res.newRestaurantBudget
        auditList.push({
          comand: res.resultOfOrder,
          Warehouse: res.warehous,
          Budget: newRestaurantBudget
        })
       
    } else if (parsedInputData[i].action === 'Order'){
    let res = getOrderAction(data, ingredientsPrices, newRestaurantBudget, ...newParsedWarehouseStock)
    resultData.push(res.listResult)
    newRestaurantBudget = res.newRestaurantBudget
    auditList.push({
      comand: res.resultOfOrder + "-> success",
      Warehouse: res.warehous,
      Budget: newRestaurantBudget,
    })
    } 
    else if (parsedInputData[i].action === 'Audit'){
      let res = getAuditAction(auditList)
     
      auditResult.push(res)
      }
      
    else resultData.push("RESTAURANT BANKRUPT")
  }



  resultData.push("Restaurant budget: " + newRestaurantBudget);
  fs.writeFile("./output/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
  fs.writeFile("./output/Audit.txt", auditResult.join(), (err) => {
    if (err) console.log(err);
  });
}
res(sendReadedData, sendReadedDataFromWarehouse)


