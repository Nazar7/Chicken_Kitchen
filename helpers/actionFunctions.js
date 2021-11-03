const {
    checkAllergiExist,
    getOrderPrice,
    parseBaseIngridients,
    getWarehousStockAfterOrder,
  } = require("../helpers/index.js");


 const getBuyAction =  (
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
    ) => {

    
      let parsefoodIngredients = parseBaseIngridients(foodIngredients)
 
      
     ordersList = [data.action, data.arg, data.val]
     let customer = ordersList[1][0]
     let customerName = ordersList[1][0].split(" ")[0]
     let order = ordersList[2][0]
 let customerBudget = customersBudgets.find(x => x.customer === customer).budget;

    const orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");


      let workData = getWarehousStockAfterOrder (order, parsefoodIngredients, baseIngredients, foodIngredients)
      console.log(workData)
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    const alergiExist =  checkAllergiExist(
      orderIngridients,
      order,
      customerAllergieProducts,
      customer
    );

    let orderPrice =  parseInt(getOrderPrice(orderIngridients, ingredientsPrices))
    if (customerBudget > orderPrice && ordersList.length >= 3) {
            var resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + orderPrice + " -> " + alergiExist;
            newRestaurantBudget += (parseInt(orderPrice) * 1.3)
            return [resultOfOrder, parseInt(newRestaurantBudget)];
          } else if (customerBudget < orderPrice) {
            var resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
            return [resultOfOrder, newRestaurantBudget];
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
  customerAllergieProducts,
  getBaseIngridientsOfOrder,
  newRestaurantBudget
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
      order,
      customerAllergieProducts,
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




  const getOrderAction = (data, ingredientsPrices, newRestaurantBudget) => {
    ordersList = [data.action, data.arg, data.val]
    let orderName = data.arg[0]
    let orderQuantity = parseInt(data.val[0])
    let restaurantBudget = newRestaurantBudget
    let orderResult = [];
    let parsIngredientsPrices = {};
    for (element in ingredientsPrices) {
      parsIngredientsPrices[ingredientsPrices[element].ingredients] =
      parseInt(ingredientsPrices[element].price);
    }

    for (const [key, value] of Object.entries(parsIngredientsPrices)) {
      if(orderName === key) {
        let ingridientPrice = parseInt(value)
       let resturanOrderPrice = orderQuantity * ingridientPrice
       let newRestaurantBudget = restaurantBudget - resturanOrderPrice;
       if(newRestaurantBudget < 0){
        orderResult = ["RESTAURANT BANKRUPT", newRestaurantBudget]
        return orderResult
       } else {
        orderResult = [ordersList, newRestaurantBudget]
        return orderResult
       } 
      }
    };
  };

  const getBudgetAction = (data) => {
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
    getBudgetAction
  }