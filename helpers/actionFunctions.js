// const {
//     checkAllergiExist,
//   } = require("../helpers/index.js");

  const {
    parseBaseIngridients,
    getAllDishIngridients,
    checkAllDishUniques
  } = require("../dataHandlers/handleDishData");

  const {
    getParseWarehousData,
    getBalanceAtWarehous
  } = require("../dataHandlers/handleWarehousData");

  const {
    getOrderPrice,
  } = require("../dataHandlers/handleOrderData");

  const {
    getCustomerAllergieProduct,
    checkAllergiExist,
    getParseCustomersAllergiesProducts
  } = require("../dataHandlers/handleCustomersData");


 const getBuyAction =  (
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
        newParsedWarehouseStock,
        customerAllergieProducts,
        auditList
    ) => {

      let parsefoodIngredients = parseBaseIngridients(foodIngredients)
 
      
     ordersList = [data.action, data.arg, data.val]
     let customer = ordersList[1][0]
     let customerName = ordersList[1][0].split(" ")[0]
     let order = ordersList[2][0]

    const customerBudget = parseInt(customersBudgets.find( ({ customer }) => customer === customer ).budget);
    
 let customerAllergieProduct = getCustomerAllergieProduct(customerAllergieProducts, customer);

    let orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");
  

    // let dishIngridientsList = getAllDishIngridients (order, parsefoodIngredients, baseIngredients, parsedWarehouseStock)


    const customersAllergiesList = getParseCustomersAllergiesProducts(customerAllergieProducts)

    const alergiExist =  checkAllergiExist(
      orderIngridients, 
      customersAllergiesList, 
      customer, 
      order);

    let orderPrice =  parseInt(getOrderPrice(orderIngridients, ingredientsPrices))

    if (customerBudget > orderPrice && ordersList.length == 3 && alergiExist === "seccess") {
            var resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + orderPrice + " -> " + alergiExist;
            newRestaurantBudget += orderPrice * 1.3
            let warehouseStock = getAllDishIngridients (order, parsefoodIngredients, baseIngredients, newParsedWarehouseStock)
            // parsedWarehouseStock[orderName] = parseInt(parsedWarehouseStock[orderName]) - orderQuantity
            // console.log(dishIngridientsList)
            return {resultOfOrder, newRestaurantBudget, warehouseStock};
          } else if (customerBudget < orderPrice) {
            var resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
            let warehouseStock = newParsedWarehouseStock
            return {resultOfOrder, newRestaurantBudget, warehouseStock};
          }else if (alergiExist !== "seccess") {
            var resultOfOrder = alergiExist
            // parsedWarehouseStock[orderName] = parseInt(parsedWarehouseStock[orderName]) - orderQuantity
            let warehouseStock = newParsedWarehouseStock
            return {resultOfOrder, newRestaurantBudget, warehouseStock};
          }
};



const getTableAction =  (
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
  parsedWarehouseStock,
  parsedCustomersAllergiesProducts,
  auditList
    ) => {
     ordersList = [data.action, data.arg, data.val]
     let result = []
     let resultOfOrder = []
     let resultOfOrderByCustomers = []
     let totalOrder = 0

    data.arg.map((item, i, arr) => {
     let customer = data.arg[i]
     let customerName = data.arg[i][1].split(" ")[0]
     let order = data.val[i]
 let customerBudget = customersBudgets.find(x => x.customer === customer).budget;
    const orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");

    const alergiExist =  checkAllergiExist(
      orderIngridients,
      customersAllergies,
      customer
    );
    let orderPrice =  parseInt(getOrderPrice(orderIngridients, ingredientsPrices))
    totalOrder += orderPrice

    if(data.arg.length > data.val.length){
      return "ERROR. Every person needs something to eat. So, whole table fails."
    } else if (data.arg.length < data.val.length) {
      return "ERROR. One person can have one type of food only. So, whole table fails."
    } else if (data.arg.every( (val, i, arr) => val === arr[0]) && data.val.every( (val, i, arr) => val === arr[0])) {
        return "ERROR. One person can have one type of food only. So, whole table fails."
    } 
    result.push({customer, customerBudget, order, orderPrice, alergiExist})
    resultOfOrderByCustomers.push([customer + ", " + customerBudget + ", " + order + ", " + orderPrice])
    resultOfOrder = (data.action + "," + data.arg + "," + data.val + " -> " + alergiExist + '; ' + "money amount: " + totalOrder)

  })
  return [result, resultOfOrder, resultOfOrderByCustomers]
}




  const getOrderAction = (data, ingredientsPrices, newRestaurantBudget, parsedWarehouseStock) => {
    ordersList = [data.action, data.arg, data.val]
    let listResult = ""
    let orderAction = data.action;
    let orderName = data.arg[0]
    let orderQuantity = parseInt(data.val)
    let restaurantBudget = newRestaurantBudget
    let parsIngredientsPrices = {};
    for (element in ingredientsPrices) {
      parsIngredientsPrices[ingredientsPrices[element].ingredients] =
      parseInt(ingredientsPrices[element].price);
    }
    for (const [key, value] of Object.entries(parsIngredientsPrices)) {
      if(orderName === key && orderName in parsIngredientsPrices) {
        let ingridientPrice = parseInt(value)
       let resturanOrderPrice = orderQuantity * ingridientPrice
       let newRestaurantBudget = restaurantBudget - resturanOrderPrice;
       if(newRestaurantBudget < 0){
         let message = "RESTAURANT BANKRUPT"
         return {message, newRestaurantBudget}
       } else if(parsedWarehouseStock[orderName] == orderName){
          parsedWarehouseStock[orderName] = parsedWarehouseStock[orderName]
          listResult = (orderAction + ", " + orderName + ", " + orderQuantity )
          return {listResult, newRestaurantBudget, parsedWarehouseStock}
         }
         parsedWarehouseStock[orderName] = parseInt(parsedWarehouseStock[orderName]) + orderQuantity  
          listResult = (orderAction + ", " + orderName + ", " + orderQuantity)
         return {listResult, newRestaurantBudget, parsedWarehouseStock}
      }

    };
    console.log("There is no such order in ingredient list")
  };


  const getBudgetAction = (data, auditList) => {
    // let restaurantBudget = 500;
    let newRestaurantBudget = data.val[0];
    if(data.arg[0] === "="){
      return newRestaurantBudget = ["Restaurant budget: ", parseInt(data.val[0])]
    } else if (data.arg[0] === "+") {
      return newRestaurantBudget = ["Restaurant budget: ", (restaurantBudget + parseInt(data.val[0]))]
    } else if (data.arg[0] === "-") {
      return newRestaurantBudget = ["Restaurant budget: ", (restaurantBudget - parseInt(data.val[0]))]
    } 
 
  };


  const getAuditAction =  (auditList) => {
    console.log(auditList)
    let outputAuditList = []
    auditList.forEach(element => {
      outputAuditList.push("command:" + element.comand + "\n" + "Warehouse:" + JSON.stringify(element.Warehouse) + "\n" + "Budget:" + JSON.stringify(element.Budget) + "\n")
    });
    return outputAuditList.join('')
  };

  // const compareRestaurentBudget = (getOrderAction, newRestaurantBudget, orderIngridients, baseIngredientsPrices) => {
  //   let orderIncome = getOrderPrice(orderIngridients, baseIngredientsPrices)
  //     if(parseInt(getOrderAction) > parseInt(newRestaurantBudget)){
  //         return ("RESTAURANT BANKRUPT");
  //     } else {
  //         return ("Restaurant budget:" + (newRestaurantBudget + orderIncome));
  // }
// }

  module.exports = {
    getBuyAction,
    getTableAction,
    getOrderAction,
    // compareRestaurentBudget,
    getBudgetAction,
    getAuditAction
  }