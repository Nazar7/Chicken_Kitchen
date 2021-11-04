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
  } = require("./helpers/actionFunctions.js")

  const {
    getCustomerAllergieProduct,
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
  const parseWarehouseStock = getParseWarehousData(warehousData)
// console.log(parseWarehouseStock)

// console.log(parsedInputData.length)



  let restaurantBudget = 500;
  var resultData = [];
  resultData.push("Restaurant budget: " + restaurantBudget);
  let newRestaurantBudget = restaurantBudget; 
  for (let i = 0; i <= parsedInputData.length-1; i++) {
    console.log(newRestaurantBudget)
    let customer = "";
    let orderr = "";
    let data = parsedInputData[i]

    

    const foodIngredients = await getFoodIngredientsList()

    const baseIngredients = await getBaseIngredientsList()

    const customerAllergieProducts = await getCustomerAllergieProductsList(customer)

    const ingredientsPrices = await getBaseIngredientsPricesList()

    const customersBudgets = await getCustomersBudgetsList()
   
    if(newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg[0] === "="){
      let result = getBudgetAction(data)
      newRestaurantBudget = result[1]
      resultData.push(result.join(""))
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg[0] === "+") {
    
      let result = getBudgetAction(data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg[0] === "-") {
   
      let result = getBudgetAction(data)
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
        newRestaurantBudget
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
        customerAllergieProducts,
        getBaseIngridientsOfOrder,
        newRestaurantBudget,
        parseWarehouseStock
        )
        newRestaurantBudget = res[1] 
        resultData.push(res[0].split())
    } else if (parsedInputData[i].action === 'Order'){
      // console.log(parsedInputData[i].action)
    let res = getOrderAction(data, ingredientsPrices, newRestaurantBudget)
    // console.log(res[0])
    // console.log(res[1])
    resultData.push(res[0])
    newRestaurantBudget = res[1]
    }
    else resultData.push("RESTAURANT BANKRUPT")
  }


  fs.writeFile("./data/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
}
res(sendReadedData, sendReadedDataFromWarehouse)


