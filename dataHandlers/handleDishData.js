const parseBaseIngridients = (foodIngredients) => {
    let parseData = {};
      for (element in foodIngredients) {
        parseData[foodIngredients[element].food] =
          foodIngredients[element].ingredients.split(", ");
      }
      return parseData
    }

// const getBaseIngredientsPrices = (data) => {
//   console.log(data)
//     let parsPrice = {};
//   for (element in data) {
//     parsPrice[data[element].ingredients] =
//     data[element].price.split(", ");
//   }
//   console.log(parsPrice)
//   return parsPrice;
//   };

  // const getFoodIngredients = (foodIngredients) => {
  //   console.log(getFoodIngredients)
  //   let parsFood = {};
  //   for (element in foodIngredients) {
  //     parsFood[foodIngredients[element].food] =
  //       foodIngredients[element].ingredients.split(", ");
  //   }
  //   console.log(parsFood)
  //   return parsFood;
  // };



  const getAllDishIngridients = (order, parsefoodIngredients, baseIngredients, newParsedWarehouseStock) => {

    if(order in newParsedWarehouseStock[0]){
      newParsedWarehouseStock[0][order] = newParsedWarehouseStock[0][order]-1
      return newParsedWarehouseStock[0]
    } else {
      return parsefoodIngredients[order].map(function(item, idex) {
        if(item in newParsedWarehouseStock[0]){
          newParsedWarehouseStock[0][item] = newParsedWarehouseStock[0][item]-1
         return newParsedWarehouseStock[0]
        } else {
          getAllDishIngridients (item, parsefoodIngredients, baseIngredients, newParsedWarehouseStock)
          return newParsedWarehouseStock[0]
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
  // getFoodIngredients,
  // getBaseIngredientsPrices,
  parseBaseIngridients,
  getAllDishIngridients,
  // checkAllDishUniques
  }