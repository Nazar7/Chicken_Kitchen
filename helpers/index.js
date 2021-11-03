const getParseInputData = (ordersList) => {
  const parsInputData = []
  let tableCustomers = []
  for (let i = 0; i <= ordersList.length-1; i++) {
    let tableParsInputData = ordersList[i].split(", ")
    let actionName = tableParsInputData.shift();
      tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
      tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
      let [action, arg, val] = [actionName, tableCustomers, tableOrders]
      parsInputData.push({ action, arg, val });
  }
  return parsInputData
// console.log(parsInputData)
  // let parsInputData = [];
  // for (let i = 0; i <= ordersList.length-1; i++) {
  //   let [action, arg, val] = ordersList[i].split(", ");
  //   if (action !== ""  && arg !== "" && val !== "" && ordersList[i].length >= 3) {
  //     parsInputData.push({ action, arg, val });
  //   } else i++
  // }
  // return parsInputData
 }

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
 


const getRestaurantBudget = (data) => {
  return data.split(`\n`)[0]
  };


const getOrderDataFromTxt = (data) => {
  return data
}


const getCustomerAllergieProduct = (data, customer) => { 
  if(customer !== "") return data.find((o) => o.name === customer).product.split(", ");

};

const getBaseIngredientsPrices = (data) => {
    let parsPrice = {};
  for (element in data) {
    parsPrice[data[element].ingredients] =
    data[element].price.split(", ");
  }
  return parsPrice;
  };

  
  const getCustomersBudgets = (data) => {
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


const parseBaseIngridients = (foodIngredients) => {
let parseData = {};
  for (element in foodIngredients) {
    parseData[foodIngredients[element].food] =
      foodIngredients[element].ingredients.split(", ");
  }
  return parseData
}



const getWarehousStockAfterOrder = (order, data, baseIngredients, foodIngredients) => {
  return data[order].map((item) => {
    for (const [key, value] of Object.entries(data)) {
      if(item === key){
        console.log(data[order].join(item))
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        
      }
      return item
    }
      // if (baseIngredients.includes(item)) {
      //   return item;
      // }
      return getWarehousStockAfterOrder(item, data, baseIngredients, foodIngredients);
    })
    .join("" + ", ");

}



const checkAllergiExist = (result, capitalize, customerAllergieProduct, customer) => {
  let data = ''
  let exist = false;
  for (i = 0; i <= customerAllergieProduct.length; i++) {
    if (result.indexOf(customerAllergieProduct[i]) !== -1) {
      exist = true;
      // data = customer + " - " + capitalize + ": " + "can’t order, allergic to: " + customerAllergieProduct;
      data = "can’t buy, allergic to " + customerAllergieProduct;
      if(exist) return data;
      
    } else {
      exist = false;
      // data = customer + " - " + capitalize + ": " + "success";
      data = "seccess"
      if(!exist) return data    
    }
  }
};


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

const getCustomerBudget = (customer, customerBudget) =>{
  let totalBudget = null;
      for (const [key, value] of Object.entries(customerBudget)) {
          if(key === customer){
            totalBudget = parseInt(value)
          }
      }
    return totalBudget;
}


module.exports = {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomersBudgets,
  checkAllergiExist,
  getOrderPrice,
  getCustomerBudget,
  getBaseIngridientsOfOrder,
  getOrderDataFromTxt,
  getRestaurantBudget,
  getParseInputData,
  getParseWarehousData,
  getWarehousStockAfterOrder,
  parseBaseIngridients
};
