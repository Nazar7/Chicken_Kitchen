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
  getOrderAction,
  getBudgetAction,
  } = require("./helpers/actionFunctions.js")

const {
  getBaseIngridientsOfOrder,
  getParseInputData,
  getFoodIngredients
} = require("./helpers/index.js");

const {
  sendReadedData
} = require("./services/dataFromFile.js")

const res = async (sendReadedData) => {
  const ordersList = await sendReadedData()
  const parsedInputData = getParseInputData(ordersList)

  let restaurantBudget = 500;
  var resultData = [];
  resultData.push("Restaurant budget: " + restaurantBudget);
  let newRestaurantBudget = restaurantBudget; 
  for (let i = 0; i <= parsedInputData.length-1; i++) {
    console.log(newRestaurantBudget)
    let customer = "";
    let orderr = "";
    let data = parsedInputData[i]
    console.log(data)

    const foodIngredients = await getFoodIngredientsList()

    const baseIngredients = await getBaseIngredientsList()

    const customerAllergieProducts = await getCustomerAllergieProductsList(customer)

    const ingredientsPrices = await getBaseIngredientsPricesList()

    const customersBudgets = await getCustomersBudgetsList()

    if(newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg === "="){
      let result = getBudgetAction(data)
      newRestaurantBudget = result[1]
      resultData.push(result.join(""))
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg === "+") {
    
      let result = getBudgetAction(data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Budget' && parsedInputData[i].arg === "-") {
   
      let result = getBudgetAction(data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && parsedInputData[i].action === 'Buy' || parsedInputData[i].action === 'Table') {
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
        newRestaurantBudget
        )
        newRestaurantBudget = res[1] 
        resultData.push(res[0])
    } else if (parsedInputData[i].action === 'Order'){
    let res = getOrderAction(data, ingredientsPrices, newRestaurantBudget)
    resultData.push(res[0])
    newRestaurantBudget = res[1]
    }
    else resultData.push("RESTAURANT BANKRUPT")
  }


  fs.writeFile("./data/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
}
res(sendReadedData)

