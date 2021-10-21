const { getDataFromFileTxt } = require("./services/indexTXT")

const {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomerBudget,
  checkAlergiExist,
  getOrderPrice,
  getBudget,
  getBaseIngridientsOfOrder,
} = require("./helpers/index.js");

var ordersList = getDataFromFileTxt().split(/\r\n/);
// Julie Mirage, Fish in water

// let parsOrders = {};
//   for (let i = 0; i < ordersList.length; i++ ){
//     if(ordersList[i].split(', ').length == 3 && ordersList[i].split(', ')[0] == "Buy"){
//     let arr = ordersList[i].split(', ')
//     parsOrders[arr[1]] = arr[2]
//     }
//   }
//   console.log(parsOrders)
//   getCustomerAllergieProduct(data, "Julie Mirage")

 