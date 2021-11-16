 class DishDatas {
    getParsedFoodIngredients (foodIngredients) {
        let parseData = {};
        for (let element in foodIngredients) {
          parseData[foodIngredients[element].food] =
          foodIngredients[element].ingredients.split(", ");
        }
        return parseData
    }

    getParsedIngredientsPrices (ingredientsPrices){
      let parsedIngredientsPrices = {};
    for (let element in ingredientsPrices) {
      parsedIngredientsPrices[ingredientsPrices[element].ingredients] =
      parseInt(ingredientsPrices[element].price);
    }
    return parsedIngredientsPrices
  }

// parseBaseIngridients (foodIngredients) {
//     let parseData = {};
//       for (element in foodIngredients) {
//         parseData[foodIngredients[element].food] =
//           foodIngredients[element].ingredients.split(", ");
//       }
//       return parseData
//     }



  getAllDishIngridients (order, parsefoodIngredients, baseIngredients, parsedWarehouseStock) {

    let self = this;
    if(order in parsedWarehouseStock){
  
      parsedWarehouseStock[order] = parsedWarehouseStock[order]-1
      return newParsedWarehouseStock
    } else {
      return parsefoodIngredients[order].map(function(item, idex) {
        if(item in parsedWarehouseStock){
          parsedWarehouseStock[item] = parsedWarehouseStock[item]-1
         return parsedWarehouseStock
        } else {
          self.getAllDishIngridients (item, parsefoodIngredients, baseIngredients, parsedWarehouseStock)
          return parsedWarehouseStock
        }
      })
    }
}
}

const getDishData = new DishDatas();

module.exports = getDishData;
