const readline = require("readline");
const fs = require("fs");

const { getDataFromFile } = require("./services/index.js");

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
  compareRestaurentBudget,
  } = require("./helpers/actionFunctions.js")

  // const {
  //   customerAllergieProduct,
  // baseIngredientListt
  // } = require("./helpers/getParsedData.js")

const {
  getBaseIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomersBudgets,
  checkAllergiExist,
  getOrderPrice,
  getCustomerBudget,
  getBaseIngridientsOfOrder,
  getParseInputData,
  getFoodIngredients
} = require("./helpers/index.js");

const {
  sendReadedData
} = require("./services/dataFromFile.js")

// Julie Mirage, Fish in water

// fs.readFile("./data/InputData.txt", "utf8", async function (err, data) {

const res = async (sendReadedData) => {
  const ordersList = await sendReadedData()
  // console.log(ordersList)
  const parsedInputData = getParseInputData(ordersList)

  // console.log(parsedInputData)

  let restaurantBudget = 500;
  var resultData = [];
  resultData.push("Restaurant budget: " + restaurantBudget);
  let newRestaurantBudget = 0; 
  for (let i = 0; i <= parsedInputData.length-1; i++) {
    let customer = "";
    let orderr = "";
    let resturanOrderProduct = "";
    let resturanOrderQuantity = "";
    let data = parsedInputData[i]
    // let obj = parsedInputData[i]

   
    const foodIngredients = await getFoodIngredientsList()

    const baseIngredients = await getBaseIngredientsList()

    const customerAllergieProducts = await getCustomerAllergieProductsList(customer)

    const ingredientsPrices = await getBaseIngredientsPricesList()

    const customersBudgets = await getCustomersBudgetsList()


    if(parsedInputData[i].action === 'Budget' && parsedInputData[i].arg === "="){
      newRestaurantBudget = getBudgetAction(data)
      console.log(newRestaurantBudget)
      resultData.push(newRestaurantBudget)
      // restaurantBudget = parseInt(parsedInputData[i].val)
    } else if (parsedInputData[i].action === 'Budget' && parsedInputData[i].arg === "+") {
      newRestaurantBudget = getBudgetAction(data)
      console.log(newRestaurantBudget)
      resultData.push(newRestaurantBudget)
      // restaurantBudget += parseInt(parsedInputData[i].val)
    } else if (parsedInputData[i].action === 'Budget' && parsedInputData[i].arg === "-") {
      newRestaurantBudget = getBudgetAction(data)
      console.log(newRestaurantBudget)
      resultData.push(newRestaurantBudget)
      // restaurantBudget -= parseInt(parsedInputData[i].val)
    } else if (parsedInputData[i].action === 'Buy' || parsedInputData[i].action === 'Table') {
      // console.log("URAAAAAAAAAAAAAAAAAAAAA")
      // console.log(data)
      // console.log(i)
      const res = getBuyAction(
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
        console.log(res)
      // customer = parsedInputData[i].arg;
      // customerName = customer.split(', ')[0];
      // orderr = parsedInputData[i].val;
    } else if (parsedInputData[i].action === 'Order') {
      // resturanOrderProduct = parsedInputData[i].arg;
      // resturanOrderQuantity = parsedInputData[i].val;
    } 

   

    // const customerAllergieProduct = getCustomerAllergieProduct(
    //   await getDataFromFile("./data/RegularCustomersAllergies.csv"),
    //   customer
    // );

  
    // const baseIngredientListt = await getDataFromFile(
    //   "./data/BaseIngredientList.csv"
    // ).then((data) => {
    //   return data[0].ingredients.split(",");
    // });

  

    // console.log(baseIngredientListt)

    // const foodIngredientsListt = await getFoodIngredients(
    //   await getDataFromFile("./data/FoodIngredients.csv"),
    //   customer
    // );

    // console.log(foodIngredientsListt)

    // const baseIngredientsPrices = getBaseIngredientsPrices(
    //   await getDataFromFile("./data/BaseIngridientsPrice.csv")
    // );

    // console.log(baseIngredientsPrices)

    // const customersBudgets = getCustomersBudgets(
    //   await getDataFromFile("./data/RegularCustomerBudget.csv")
    // );

    // console.log(customerBudget)

  
    // console.log(foodIngredientsListt)
    // console.log(baseIngredientListt)
    // let data = parsedInputData[i]
    // console.log(data)
  //  console.log(resultData)

console.log("_______________________________________________________")
// console.log(resultData)
// console.log(i)
// console.log(resultData.includes("RESTAURANT BANKRUPT"))
// let q = resultData.split(",")
// console.log(resultData)
// console.log(i)
// console.log(resultData[i])
// console.log(resultData[i].includes("RESTAURANT BANKRUPT"))





// if((parsedInputData[i].action === "Buy" || parsedInputData[i].action === "Table") && newRestaurantBudget > 0 ){
//   // console.log(i)
//   // console.log(resultData)
//   let r = getBuyAction( 
//     data,
//     i,    
//     customer,
//     foodIngredientsListt,
//     baseIngredientListt,
//     customersBudgets,
//     baseIngredientsPrices,
//     customerAllergieProduct,
//     getBaseIngridientsOfOrder,
//     )
//     console.log(r[1] + "111111111111111111111111111111111")
//     console.log(r)
//     // newRestaurantBudget += parseInt(r[1])
//     // console.log(r[0])
//     resultData.push(r[0])
  
//   // resultData.push(getBuyAction( 
//   //   data,
//   //   i,    
//   //   customer,
//   //   foodIngredientsListt,
//   //   baseIngredientListt,
//   //   customersBudgets,
//   //   baseIngredientsPrices,
//   //   customerAllergieProduct,
//   //   getBaseIngridientsOfOrder,
//   //   )
//   // )
// }else if (parsedInputData[i].action === "Budget" ) {
//   newRestaurantBudget += parseInt(restaurantBudget);
//   resultData.push("Restaurant budget: " + newRestaurantBudget);
// } else if (parsedInputData[i].action === "Order" ) {
//   let bankruptEvent = getOrderAction(data, baseIngredientsPrices, newRestaurantBudget)
//   newRestaurantBudget = parseInt(bankruptEvent[1])
//   resultData.push(bankruptEvent)
// }else if(resultData[i] === "RESTAURANT BANKRUPT"){

// }

  
  }

  // resultData.push("Restaurant budget: " + newBudget);

  fs.writeFile("./data/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
}
res(sendReadedData)
// });
