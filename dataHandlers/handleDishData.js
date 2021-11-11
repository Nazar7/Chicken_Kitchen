const parseBaseIngridients = (foodIngredients) => {
    let parseData = {};
      for (element in foodIngredients) {
        parseData[foodIngredients[element].food] =
          foodIngredients[element].ingredients.split(", ");
      }
      return parseData
    }



  const getAllDishIngridients = (order, parsefoodIngredients, baseIngredients, newParsedWarehouseStock) => {
    if(order in newParsedWarehouseStock){
      newParsedWarehouseStock[order] = newParsedWarehouseStock[order]-1
      return newParsedWarehouseStock
    } else {
      return parsefoodIngredients[order].map(function(item, idex) {
        if(item in newParsedWarehouseStock){
          newParsedWarehouseStock[item] = newParsedWarehouseStock[item]-1
         return newParsedWarehouseStock
        } else {
          getAllDishIngridients (item, parsefoodIngredients, baseIngredients, newParsedWarehouseStock)
          return newParsedWarehouseStock
        }
      })
    }
}


  module.exports = {
  parseBaseIngridients,
  getAllDishIngridients,

  }