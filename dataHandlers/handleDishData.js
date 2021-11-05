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



  const getAllDishIngridients = (order, parsefoodIngredients, baseIngredients, parsedWarehouseStock) => {
    if(order in parsedWarehouseStock){
      parsedWarehouseStock[order] = parsedWarehouseStock[order]-1
      return parsedWarehouseStock
    } else {
      return parsefoodIngredients[order].map(function(item, idex) {
        if(item in parsedWarehouseStock){
        parsedWarehouseStock[item] = parsedWarehouseStock[item]-1
         return parsedWarehouseStock
        } else {
          getAllDishIngridients (item, parsefoodIngredients, baseIngredients, parsedWarehouseStock)
          return parsedWarehouseStock
        }
      })
    }
}


//   const getAllDishIngridients = (order, parseData, baseIngredients) => {
//     return parseData[order].map((item) => {
//       if(baseIngredients.includes(item)){
//       return item
//       } else {
//       return getAllDishIngridients (item, parseData, baseIngredients)
//       }
//   }).join("" + "," + parseData[order] + "" + ",")
// }

// const checkAllDishUniques = (order, dishIngridientsList) => {
//   // dishIngridientsList.push(order)
//   uniqueData = dishIngridientsList.filter(function(item, pos) {
//     return dishIngridientsList.indexOf(item) == pos;
// })
//   return uniqueData
// }
  
  module.exports = {
  getFoodIngredients,
  getBaseIngredientsPrices,
  parseBaseIngridients,
  getAllDishIngridients,
  // checkAllDishUniques
  }