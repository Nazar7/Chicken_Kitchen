const getOrderDataFromTxt = (data) => {
    return data
  }

  const getBaseIngridientsOfOrder = (order, foodIngredients, baseIngredients) => {
    let parsFood = {};
    for (element in foodIngredients) {
      parsFood[foodIngredients[element].food] =
        foodIngredients[element].ingredients.split(", ");
    }
    return parsFood[order]
      .map((item) => {
        if (baseIngredients.includes(item)) {
          return item;
        }
        return getBaseIngridientsOfOrder(item, foodIngredients, baseIngredients);
      })
      .join("" + ", ");
  }


  const getOrderPrice = (orderIngridients, ingredientsPrices) =>{
    let parsIngredientsPrices = {};
    for (element in ingredientsPrices) {
      parsIngredientsPrices[ingredientsPrices[element].ingredients] =
      parseInt(ingredientsPrices[element].price);
    }
    let totalOrderPrice = null;
      for (let i = 0;  i < orderIngridients.length; i++){
        for (const [key, value] of Object.entries(parsIngredientsPrices)) {
            if(key === orderIngridients[i]){
              totalOrderPrice += parseInt(value)
            }
        }
      }
      return totalOrderPrice;
  }

  module.exports = {
    getOrderPrice,
    getBaseIngridientsOfOrder,
    getOrderDataFromTxt,

  };