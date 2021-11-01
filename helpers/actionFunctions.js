const {
    checkAllergiExist,
    getOrderPrice,
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
  newRestaurantBudget
    ) => {

     ordersList = [data.action, data.arg, data.val]
     let customer = ordersList[1]
     let customerName = ordersList[1].split(" ")[0]
     let order = ordersList[2]

 let customerBudget = customersBudgets.find(x => x.customer === customer).budget;
    const orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");
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
     let customer = ordersList[1]
     let customerName = ordersList[1].split(" ")[0]
     let order = ordersList[2]

 let customerBudget = customersBudgets.find(x => x.customer === customer).budget;
    const orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");
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

  const getOrderAction = (data, ingredientsPrices, newRestaurantBudget) => {
    ordersList = [data.action, data.arg, data.val]
    let orderName = data.arg
    let orderQuantity = parseInt(data.val)
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
         console.log(newRestaurantBudget)
        resultData = "RESTAURANT BANKRUPT";
        orderResult = ["RESTAURANT BANKRUPT", newRestaurantBudget]
        return orderResult
       } else {
         console.log(ordersList)
        orderResult = [ordersList, newRestaurantBudget]
        return orderResult
       } 
      }
    };
  };

  const getBudgetAction = (data) => {
    let restaurantBudget = 500;
    let newRestaurantBudget = restaurantBudget;
    if(data.arg === "="){
      console.log("Restaurant budget: ", parseInt(data.val))
      return newRestaurantBudget = ["Restaurant budget: ", parseInt(data.val)]
    } else if (data.arg === "+") {
      return newRestaurantBudget = ["Restaurant budget: ", (restaurantBudget + parseInt(data.val))]
    } else if (data.arg === "-") {
      return newRestaurantBudget = ["Restaurant budget: ", (restaurantBudget - parseInt(data.val))]
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
    getOrderAction,
    // compareRestaurentBudget,
    getBudgetAction
  }