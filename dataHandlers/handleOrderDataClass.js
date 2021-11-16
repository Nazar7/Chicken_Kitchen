
class OrderDatas {

getBaseIngridientsOfOrder ( order, parsefoodIngredients, baseIngredients) {
    let self = this;
    return parsefoodIngredients[order].map((item) => {
        if (baseIngredients[0].ingredients.split(",").includes(item)) {
          return item;
        }
        return self.getBaseIngridientsOfOrder(item, parsefoodIngredients, baseIngredients);
      })
      .join("" + ", ");
      
  }

  getOrderPrice (orderIngridients, ingredientsPrices) {
    let parsIngredientsPrices = {};
    for (let element in ingredientsPrices) {
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
}

const getOrderData = new OrderDatas();

module.exports = getOrderData;

