const getCustomerAllergieProduct = (data, customer) => {
  return data.find((o) => o.name === customer).product.split(", ");
};

const getBaseIngredientsPrices = (data) => {
    let parsPrice = {};
  for (element in data) {
    parsPrice[data[element].ingredients] =
    data[element].price.split(", ");
  }
  return parsPrice;
  };
  
  const getCustomerBudget = (data) => {
    let parsBudget = {};
  for (element in data) {
    parsBudget[data[element].customer] =
    data[element].budget.split(", ");
  }
  return parsBudget;
  };

const getFoodIngredients = (foodIngredients) => {
  let parsFood = {};
  for (element in foodIngredients) {
    parsFood[foodIngredients[element].food] =
      foodIngredients[element].ingredients.split(", ");
  }
  return parsFood;
};

function getCapitalize(order) {
  const capitalizeFoodName = order
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
  return capitalizeFoodName;
}

const getBaseIngridientsOfOrder = (orderr, foodIngredientsListt, baseIngredientListt) => {
  let parsFood = foodIngredientsListt;
  return parsFood[orderr]
    .map((item) => {
      if (baseIngredientListt.includes(item)) {
        return item;
      }
      return getBaseIngridientsOfOrder(item, foodIngredientsListt, baseIngredientListt);
    })
    .join("" + ", ");
};

const checkAlergiExist = (result, capitalize, customerAllergieProduct, customer) => {
  for (i = 0; i <= customerAllergieProduct.length; i++) {
    if (result.indexOf(customerAllergieProduct[i]) !== -1) {
      console.log(customer + " - " + capitalize + ": " + "can’t order, allergic to: " + customerAllergieProduct); 
      break;
    } else {
      console.log(customer + " - " + capitalize + ": " + "succes");
      // console.log(customerAllergieProduct)
      break;
    }
  }
};


const getOrderPrice = (orderIngridients, baseIngredientsPrices) =>{
  let totalOrderPrice = null;
    for (let i = 0;  i < orderIngridients.length; i++){
      for (const [key, value] of Object.entries(baseIngredientsPrices)) {
          if(key === orderIngridients[i]){
            totalOrderPrice += parseInt(value)
          }
      }
    }
    console.log(totalOrderPrice + " - total price of food")
    return totalOrderPrice;
}

const getBudget = (customer, customerBudget) =>{
  let totalBudget = null;
      for (const [key, value] of Object.entries(customerBudget)) {
          if(key === customer){
            totalBudget = parseInt(value)
          }
      }
    console.log(totalBudget + " - budget of client")
    return totalBudget;
}


module.exports = {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomerBudget,
  checkAlergiExist,
  getOrderPrice,
  getBudget,
  getBaseIngridientsOfOrder,
};
