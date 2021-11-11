const fs = require("fs");

const {
    getBaseIngredientsList,
    getFoodIngredientsList,
    getCustomerAllergieProductsList,
    getBaseIngredientsPricesList,
    getCustomersBudgetsList,
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
} = require("./services/dataFromFile.js")

const {
  sendReadedDataFromWarehouse,
} = require("./services/dataFromTxtFile.js")


const res = async (sendReadedData,sendReadedDataFromWarehouse) => {




  const ordersList = await sendReadedData()

  const warehousData = await sendReadedDataFromWarehouse()

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


