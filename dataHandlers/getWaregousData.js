const getParseWarehousData = (warehousData) => {
    let parsedWarehousData = warehousData.split(", ")
    let obj = {}
    const keys = parsedWarehousData.filter((item, index) => {
      return index % 2 == 0
    });
    const values = parsedWarehousData.filter((item, index) => {
      return index % 2 !== 0
    });
    let warehousList = keys.forEach((element, index) => {
      obj[element] = values[index]
    });
    return obj
    }


const getWarehousStockAfterOrder = (order, parseData, baseIngredients, foodIngredients) => {
    console.log(order)
  console.log(parseData)
    return parseData[order]
      .map((item) => {
        if (baseIngredients.includes(item)) {
          return item;
        }
        return getBaseIngridientsOfOrder(item, foodIngredients, baseIngredients);
      })
      .join("" + ", ");
  
    // return data[order].map((item) => {
    //   for (const [key, value] of Object.entries(data)) {
    //     if(item === key){
    //       console.log(data[order].join(item))
    //       console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          
    //     }
    //     return item
    //   }
    //     // if (baseIngredients.includes(item)) {
    //     //   return item;
    //     // }
    //     return getWarehousStockAfterOrder(item, data, baseIngredients, foodIngredients);
    //   })
    //   .join("" + ", ");
  
  }

  module.exports = {
    getParseWarehousData,
    getWarehousStockAfterOrder,
  };