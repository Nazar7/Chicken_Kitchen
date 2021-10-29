const {
    checkAllergiExist,
    getOrderPrice,
    getParseInputData,
    // getBaseIngridientsOfOrder,
  } = require("../helpers/index.js");


  // const {
  //   customerAllergieProducts
  // } = require("../helpers/getData");
 


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
     let resultData = []

     ordersList = [data.action, data.arg, data.val]


     
     let customer = ordersList[1]
     let customerName = ordersList[1].split(" ")[0]

     let order = ordersList[2]


 let customerBudget = customersBudgets.find(x => x.customer === customer).budget;

    const orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");

  
    let restOfCustomerBudget =""
    const alergiExist =  checkAllergiExist(
      orderIngridients,
      order,
      customerAllergieProducts,
      customer
    );


    let orderPrice =  parseInt(getOrderPrice(orderIngridients, ingredientsPrices))
    // console.log(orderIngridients)
    // console.log(ingredientsPrices)
    // console.log(orderPrice)
    if (customerBudget > orderPrice && ordersList.length >= 3) {
            var resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + orderPrice + " -> " + alergiExist;
            newRestaurantBudget += (parseInt(orderPrice) * 1.3)
            
            return [resultOfOrder, parseInt(newRestaurantBudget)];
          } else if (customerBudget < orderPrice) {
            var resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
            return [resultOfOrder, newRestaurantBudget];
          }
          
};

  const getOrderAction = (data, baseIngredientsPrices, newRestaurantBudget) => {
    let resultData = ''
    let ordersList = JSON.parse(JSON.stringify(data))
    console.log(ordersList)
    for (const [key, value] of Object.entries(baseIngredientsPrices)) {
      if(ordersList.arg === key) {
       let resturanOrderPrice = (parseInt(ordersList.val) * parseInt(value[0]))
       console.log(resturanOrderPrice)
       newRestaurantBudget = newRestaurantBudget - resturanOrderPrice;
       console.log(newRestaurantBudget)
       if(newRestaurantBudget < 0){
        resultData = "RESTAURANT BANKRUPT"
        return [resultData, newRestaurantBudget];
       } else {
        newRestaurantBudget = newRestaurantBudget - resturanOrderPrice;
        console.log(newRestaurantBudget)
        resultData = "Restaurant budget: " + newRestaurantBudget
        return resultData;
 
       } 
      }
    };
  };

  const getBudgetAction = (data) => {
    let restaurantBudget = 500;
    let newRestaurantBudget = restaurantBudget;
    // console.log(data)
    let resultData = ''
    let ordersList = JSON.parse(JSON.stringify(data))
    if(data.arg === "="){
      return newRestaurantBudget = "Restaurant budget: " + parseInt(data.val)
    } else if (data.arg === "+") {
      return newRestaurantBudget = "Restaurant budget: " + (restaurantBudget + parseInt(data.val))
    } else if (data.arg === "-") {
      return newRestaurantBudget = "Restaurant budget: " + (restaurantBudget - parseInt(data.val))
    } 
    // console.log(data + ": Budgetdata")
 
  };

  const compareRestaurentBudget = (getOrderAction, newRestaurantBudget, orderIngridients, baseIngredientsPrices) => {
    let orderIncome = getOrderPrice(orderIngridients, baseIngredientsPrices)
      if(parseInt(getOrderAction) > parseInt(newRestaurantBudget)){
          return ("RESTAURANT BANKRUPT");
      } else {
          return ("Restaurant budget:" + (newRestaurantBudget + orderIncome));
  }
}

  module.exports = {
    getBuyAction,
    getOrderAction,
    compareRestaurentBudget,
    getBudgetAction
  }