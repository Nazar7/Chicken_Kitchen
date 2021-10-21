const { getDataFromFile } = require("./index.js");
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
    getOrderDataFromTxt
  } = require("../helpers/index");


const customerAllergieProductt = (customer) => getCustomerAllergieProduct( getDataFromFile("./data/RegularCustomersAllergies.csv"), customer);
console.log(customerAllergieProductt())

  // const baseIngredientListt = () => getDataFromFile(
  //   "./data/BaseIngredientList.csv"
  // ).then((data) => {
  //   return data[0].ingredients.split(",");
  // });

  // const foodIngredientsListt = (customer) => getFoodIngredients(
  //    getDataFromFile("./data/FoodIngredients.csv"),
  //   customer
  // );

  // const baseIngredientsPrices = () => getBaseIngredientsPrices(
  //    getDataFromFile("./data/BaseIngridientsPrice.csv")
  // );

  // const customerBudget = () => getCustomerBudget(
  //    getDataFromFile("./data/RegularCustomerBudget.csv")
  // );

  // const orderIngridients = () => getBaseIngridientsOfOrder(orderr, foodIngredientsListt, baseIngredientListt).split(", ");
  // // console.log(orderIngridients)
  // arrayOfOrderIngridients = orderIngridients.filter(function (item, pos) {
  //   return orderIngridients.indexOf(item) == pos;
  // });

  module.exports = {
    customerAllergieProductt,
    // baseIngredientListt,
    // foodIngredientsListt,
    // baseIngredientsPrices,
    // customerBudget,
    // orderIngridients
  };