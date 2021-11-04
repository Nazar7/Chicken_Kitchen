const parseBaseIngridients = (foodIngredients) => {
    let parseData = {};
      for (element in foodIngredients) {
        parseData[foodIngredients[element].food] =
          foodIngredients[element].ingredients.split(", ");
      }
      return parseData
    }

const getBaseIngredientsPrices = (data) => {
    let parsPrice = {};
  for (element in data) {
    parsPrice[data[element].ingredients] =
    data[element].price.split(", ");
  }
  return parsPrice;
  };

  const getFoodIngredients = (foodIngredients) => {
    let parsFood = {};
    for (element in foodIngredients) {
      parsFood[foodIngredients[element].food] =
        foodIngredients[element].ingredients.split(", ");
    }
    return parsFood;
  };
  
  module.exports = {
  getFoodIngredients,
  getBaseIngredientsPrices,
  parseBaseIngridients
  }