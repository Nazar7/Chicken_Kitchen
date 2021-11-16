  const getOrderData = require("../dataHandlers/handleOrderDataClass")

  const getDishData = require("../dataHandlers/handleDishDataClass")

  const getCustomersDatas = require("../dataHandlers/handleCustomersDataClass")




 const getBuyAction =  (
  resultAllDatas,
  data,
  i,
  order,
  customer,
  newRestaurantBudget,
  ...newParsedWarehouseStock
    ) => {

    let parsefoodIngredients = getDishData.getParsedFoodIngredients(resultAllDatas.foodIngredients)
     ordersList = [data.action, data.arg, data.val]
    const customerBudget = parseInt(resultAllDatas.customersBudgets.find( ({ customer }) => customer === customer ).budget);
    let customerAllergieProduct = getCustomersDatas.getCustomerAllergieProduct(resultAllDatas.customerAllergieProducts, customer);
    let orderIngridients = getOrderData.getBaseIngridientsOfOrder(order, parsefoodIngredients, resultAllDatas.baseIngredients).split(',');
    const customersAllergiesList = getCustomersDatas.getParseCustomersAllergiesProducts(resultAllDatas.customerAllergieProducts)
    const alergiExist =  getCustomersDatas.checkAllergiExist(
      orderIngridients, 
      customersAllergiesList, 
      customer, 
      order);
    let orderPrice =  parseInt(getOrderData.getOrderPrice(orderIngridients, resultAllDatas.ingredientsPrices))
           if (customerBudget > orderPrice && ordersList.length == 3 && alergiExist === "seccess") {
            let resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + orderPrice + " -> " + alergiExist;
            newRestaurantBudget += orderPrice * 1.3
            let warehouseStock = getDishData.getAllDishIngridients(order, parsefoodIngredients, resultAllDatas.baseIngredients, resultAllDatas.parsedWarehouseStock)
            newParsedWarehouseStock = warehouseStock[0] 
            return {resultOfOrder, newRestaurantBudget, warehous: {...newParsedWarehouseStock}};
          } else if (customerBudget < orderPrice) {
            let resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
            return {resultOfOrder, newRestaurantBudget, warehous: {...newParsedWarehouseStock}};
          } else if (alergiExist !== "seccess") {
            let resultOfOrder = alergiExist
            return {resultOfOrder, newRestaurantBudget, warehous: {...newParsedWarehouseStock}};
          }
        

        
};



const getTableAction =  (
  data,
  i,
  orderr,
  foodIngredients,
  baseIngredients,
  customersBudgets,
  ingredientsPrices,
  getBaseIngridientsOfOrder,
  newRestaurantBudget,
  parsedWarehouseStock,
  parsedCustomersAllergiesProducts,
  newParsedWarehouseStock
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



  const getOrderAction = (resultAllDatas, data, newRestaurantBudget) => {
    let warehousStock = resultAllDatas.parsedWarehouseStock
    let resultOfOrder = ""
    let orderAction = data.action;
    let orderName = data.arg[0]
    let orderQuantity = parseInt(data.val)
    let restaurantBudget = newRestaurantBudget
   let parsedIngredientsPrices = getDishData.getParsedIngredientsPrices(resultAllDatas.ingredientsPrices)

    for (const [key, value] of Object.entries(parsedIngredientsPrices)) {

      if(orderName === key) {
        let ingridientPrice = parseInt(value)
       let resturanOrderPrice = orderQuantity * ingridientPrice
       let newRestaurantBudget = restaurantBudget - resturanOrderPrice;
    if(newRestaurantBudget < 0){
         let message = "RESTAURANT BANKRUPT"
         return {message, newRestaurantBudget}
       } else if(orderName in warehousStock){
        newRestaurantBudget = restaurantBudget - resturanOrderPrice;
        warehousStock[orderName] = parseInt(warehousStock[orderName]) + orderQuantity
         resultOfOrder = (orderAction + ", " + orderName + ", " + orderQuantity )
          return {resultOfOrder, newRestaurantBudget, warehous: {warehousStock}}
         } else
         newRestaurantBudget = restaurantBudget - resturanOrderPrice;
         newParsedWarehouseStock.orderName == orderQuantity
         resultOfOrder = (orderAction + ", " + orderName + ", " + orderQuantity)
         return {resultOfOrder, newRestaurantBudget, warehous: {warehousStock}}
      }
    }
    console.log("There is no such order in ingredient list")
    
  };


  const getBudgetAction = (data, newParsedWarehouseStock) => {
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
    let outputAuditList = []
    auditList.forEach(element => {
      outputAuditList.push("command:" + element.comand + "\n" + "Warehouse:" + JSON.stringify(element.Warehouse) + "\n" + "Budget:" + element.Budget + "\n")
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