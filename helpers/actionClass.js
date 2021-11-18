const getOrderData = require("../dataHandlers/handleOrderDataClass")

const getDishData = require("../dataHandlers/handleDishDataClass")

const getCustomersDatas = require("../dataHandlers/handleCustomersDataClass")


class Actions {

    constructor(){
        // this.datasFromFiles = datasFromFiles
        // this.customer = customer
        // this.datas = {
        //     customerBudget : ()=>parseInt( datasFromFiles.customersBudgets.find( ({ customer }) => customer === customer ).budget),
        //     customerAllergieProduct :(datasFromFiles, customer)=> getCustomersDatas.getCustomerAllergieProduct(this.datasFromFiles.customerAllergieProducts, this.customer),
        //     // customerAllergieProduct : getCustomersDatas.getCustomerAllergieProduct(datasFromFiles.customerAllergieProducts, customer)
        // };
        // this.customerBudget = parseInt( this.datas.customersBudgets.find( ({ customer }) => customer === customer ).budget);
        // this.parsefoodIngredients = getDishData.getParsedFoodIngredients(this.datas.foodIngredients)
        this.newRestaurantBudget = 500;
    }

    getDataForActions(datasFromFiles, data, customer, order){
    
        let parsefoodIngredients = getDishData.getParsedFoodIngredients(datasFromFiles.foodIngredients);
        let orderIngridients = getOrderData.getBaseIngridientsOfOrder(order, parsefoodIngredients, datasFromFiles.baseIngredients).split(',');
        let customersAllergiesList = getCustomersDatas.getParseCustomersAllergiesProducts(datasFromFiles.customerAllergieProducts);
        let ordersList = [data.action, data.arg, data.val];
        let customerBudget = parseInt(datasFromFiles.customersBudgets.find( ({ customer }) => customer === customer ).budget);
        let customerAllergieProduct = getCustomersDatas.getCustomerAllergieProduct(datasFromFiles.customerAllergieProducts, customer);
        let alergiExist =  getCustomersDatas.checkAllergiExist(orderIngridients, customersAllergiesList, customer, order);
        let orderPrice = parseInt(getOrderData.getOrderPrice(orderIngridients, datasFromFiles.ingredientsPrices)); 
        let warehousStock = datasFromFiles.parsedWarehouseStock
        let resultOfOrder = ""
        let orderAction = data.action;
        let orderName = data.arg[0]
        let orderQuantity = parseInt(data.val)
        let restaurantBudget = this.newRestaurantBudget
        let parsedIngredientsPrices = getDishData.getParsedIngredientsPrices(datasFromFiles.ingredientsPrices)
        
       
    }

}


class BuyAction extends Actions {
    constructor(){
        super()
        // this.customerBudget = this.getDataForActions()
        this.newRestaurantBudget = 500;
        
    }

    buyActionResult(datasFromFiles, data, customer, order){
      let parsefoodIngredients = getDishData.getParsedFoodIngredients(datasFromFiles.foodIngredients);
      let orderIngridients = getOrderData.getBaseIngridientsOfOrder(order, parsefoodIngredients, datasFromFiles.baseIngredients).split(',');
      let customersAllergiesList = getCustomersDatas.getParseCustomersAllergiesProducts(datasFromFiles.customerAllergieProducts);
      let ordersList = [data.action, data.arg, data.val];
      let customerBudget = parseInt(datasFromFiles.customersBudgets.find( ({ customer }) => customer === customer ).budget);
      // let customerBudget = parseInt(datasFromFiles.getIndividualCustomerBudget(customer));

      let customerAllergieProduct = getCustomersDatas.getCustomerAllergieProduct(datasFromFiles.customerAllergieProducts, customer);
      let alergiExist =  getCustomersDatas.checkAllergiExist(orderIngridients, customersAllergiesList, customer, order);
      let orderPrice = parseInt(getOrderData.getOrderPrice(orderIngridients, datasFromFiles.ingredientsPrices)); 
      let warehousStock = datasFromFiles.parsedWarehouseStock
      let resultOfOrder = ""
      let orderAction = data.action;
      let orderName = data.arg[0]
      let orderQuantity = parseInt(data.val)
      let restaurantBudget = this.newRestaurantBudget
      let parsedIngredientsPrices = getDishData.getParsedIngredientsPrices(datasFromFiles.ingredientsPrices)
        // console.log(getDataForActions(datasFromFiles, data, customer, order).customerBudget)
        if (customerBudget > orderPrice && ordersList.length == 3 && alergiExist === "seccess") {
    
                      let resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + orderPrice + " -> " + alergiExist;
                      let restaurantBudget = this.newRestaurantBudget + orderPrice * 1.3
                      console.log(restaurantBudget)
                      let warehouseStock = getDishData.getAllDishIngridients(order, parsefoodIngredients, datasFromFiles.baseIngredients, datasFromFiles.parsedWarehouseStock)
                      console.log(warehouseStock[0])
                      let newParsedWarehouseStock = warehouseStock[0] 
                      return {resultOfOrder, restaurantBudget, warehous: {...newParsedWarehouseStock}};
                    } else if (customerBudget < orderPrice) {
                      let resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
                      return {resultOfOrder, restaurantBudget, warehous: {...newParsedWarehouseStock}};
                    } else if (alergiExist !== "seccess") {
                      let resultOfOrder = alergiExist
                      // console.log(restaurantBudget)
                      return {resultOfOrder, restaurantBudget, warehous: this.newParsedWarehouseStock};
                    }
    }
}

class OrderAction extends Actions {
    orderActionResult(datasFromFiles, data, customer, order){
      let parsefoodIngredients = getDishData.getParsedFoodIngredients(datasFromFiles.foodIngredients);
      let orderIngridients = getOrderData.getBaseIngridientsOfOrder(order, parsefoodIngredients, datasFromFiles.baseIngredients).split(',');
      let customersAllergiesList = getCustomersDatas.getParseCustomersAllergiesProducts(datasFromFiles.customerAllergieProducts);
      let ordersList = [data.action, data.arg, data.val];
      let customerBudget = parseInt(datasFromFiles.customersBudgets.find( ({ customer }) => customer === customer ).budget);
      // let customerBudget = parseInt(datasFromFiles.getIndividualCustomerBudget(customer));

      let customerAllergieProduct = getCustomersDatas.getCustomerAllergieProduct(datasFromFiles.customerAllergieProducts, customer);
      let alergiExist =  getCustomersDatas.checkAllergiExist(orderIngridients, customersAllergiesList, customer, order);
      let orderPrice = parseInt(getOrderData.getOrderPrice(orderIngridients, datasFromFiles.ingredientsPrices)); 
      let warehousStock = datasFromFiles.parsedWarehouseStock
      let resultOfOrder = ""
      let orderAction = data.action;
      let orderName = data.arg[0]
      let orderQuantity = parseInt(data.val)
      let restaurantBudget = this.newRestaurantBudget
      let parsedIngredientsPrices = getDishData.getParsedIngredientsPrices(datasFromFiles.ingredientsPrices)
        for (const [key, value] of Object.entries(parsedIngredientsPrices)) {
                if(orderName === key) {
                  let ingridientPrice = parseInt(value)
                 let resturanOrderPrice = orderQuantity * ingridientPrice
                 let newRestaurantBudget = restaurantBudget - resturanOrderPrice;
              if(newRestaurantBudget < 0){
                   let message = "RESTAURANT BANKRUPT"
                   return {message, newRestaurantBudget}
                 } else if(orderName in warehousStock){
                  newRestaurantBudget = restaurantBudget - resturanOrderPrice;
                  warehousStock[orderName] = parseInt(warehousStock[orderName]) + orderQuantity
                   resultOfOrder = (orderAction + ", " + orderName + ", " + orderQuantity )
                    return {resultOfOrder, newRestaurantBudget, warehous: {warehousStock}}
                   } else
                   newRestaurantBudget = restaurantBudget - resturanOrderPrice;
                   newParsedWarehouseStock.orderName == orderQuantity
                   resultOfOrder = (orderAction + ", " + orderName + ", " + orderQuantity)
                   return {resultOfOrder, newRestaurantBudget, warehous: {warehousStock}}
                }
              }
              console.log("There is no such order in ingredient list")
    }
}


// buyAction  (
// datasFromFiles,
// data,
// i,
// order,
// customer,
// newRestaurantBudget,
// ...newParsedWarehouseStock
//   ) {
//   let parsefoodIngredients = getDishData.getParsedFoodIngredients(datasFromFiles.foodIngredients)
//    ordersList = [data.action, data.arg, data.val]
//   const customerBudget = parseInt(datasFromFiles.customersBudgets.find( ({ customer }) => customer === customer ).budget);
//   let customerAllergieProduct = getCustomersDatas.getCustomerAllergieProduct(datasFromFiles.customerAllergieProducts, customer);
//   let orderIngridients = getOrderData.getBaseIngridientsOfOrder(order, parsefoodIngredients, datasFromFiles.baseIngredients).split(',');
//   const customersAllergiesList = getCustomersDatas.getParseCustomersAllergiesProducts(datasFromFiles.customerAllergieProducts)
//   const alergiExist =  getCustomersDatas.checkAllergiExist(
//     orderIngridients, 
//     customersAllergiesList, 
//     customer, 
//     order);
//   let orderPrice =  parseInt(getOrderData.getOrderPrice(orderIngridients, datasFromFiles.ingredientsPrices))
//          if (customerBudget > orderPrice && ordersList.length == 3 && alergiExist === "seccess") {
//           let resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + orderPrice + " -> " + alergiExist;
//           newRestaurantBudget += orderPrice * 1.3
//           let warehouseStock = getDishData.getAllDishIngridients(order, parsefoodIngredients, datasFromFiles.baseIngredients, datasFromFiles.parsedWarehouseStock)
//           newParsedWarehouseStock = warehouseStock[0] 
//           return {resultOfOrder, newRestaurantBudget, warehous: {...newParsedWarehouseStock}};
//         } else if (customerBudget < orderPrice) {
//           let resultOfOrder = ordersList + " -> " + customer + ", " + customerBudget + ", " + order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
//           return {resultOfOrder, newRestaurantBudget, warehous: {...newParsedWarehouseStock}};
//         } else if (alergiExist !== "seccess") {
//           let resultOfOrder = alergiExist
//           return {resultOfOrder, newRestaurantBudget, warehous: {...newParsedWarehouseStock}};
//         }
      
// };



// getTableAction  (
//     datasFromFiles,
//     data,
//     i,
//     order,
//     customer,
//     newRestaurantBudget,
//     ...newParsedWarehouseStock
//   ) {
//    ordersList = [data.action, data.arg, data.val]
//    let result = []
//    let resultOfOrder = []
//    let resultOfOrderByCustomers = []
//    let totalOrder = 0
   

//   data.arg.map((item, i, arr) => {
//    let customer = data.arg[i]
//    let customerName = data.arg[i][1].split(" ")[0]
//    let order = data.val[i]
// let customerBudget = customersBudgets.find(x => x.customer === customer).budget;
//   const orderIngridients = getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients).split(", ");

//   const alergiExist =  checkAllergiExist(
//     orderIngridients,
//     customersAllergies,
//     customer
//   );
//   let orderPrice =  parseInt(getOrderPrice(orderIngridients, ingredientsPrices))
//   totalOrder += orderPrice

//   if(data.arg.length > data.val.length){
//     return "ERROR. Every person needs something to eat. So, whole table fails."
//   } else if (data.arg.length < data.val.length) {
//     return "ERROR. One person can have one type of food only. So, whole table fails."
//   } else if (data.arg.every( (val, i, arr) => val === arr[0]) && data.val.every( (val, i, arr) => val === arr[0])) {
//     return "ERROR. One person can have one type of food only. So, whole table fails."
//   } 
//   result.push({customer, customerBudget, order, orderPrice, alergiExist})
//   resultOfOrderByCustomers.push([customer + ", " + customerBudget + ", " + order + ", " + orderPrice])
//   resultOfOrder = (data.action + "," + data.arg + "," + data.val + " -> " + alergiExist + '; ' + "money amount: " + totalOrder)
// })
// return [result, resultOfOrder, resultOfOrderByCustomers]
// }



// getOrderAction (datasFromFiles, data, newRestaurantBudget) {
//   let warehousStock = datasFromFiles.parsedWarehouseStock
//   let resultOfOrder = ""
//   let orderAction = data.action;
//   let orderName = data.arg[0]
//   let orderQuantity = parseInt(data.val)
//   let restaurantBudget = newRestaurantBudget
//  let parsedIngredientsPrices = getDishData.getParsedIngredientsPrices(datasFromFiles.ingredientsPrices)

//   for (const [key, value] of Object.entries(parsedIngredientsPrices)) {

//     if(orderName === key) {
//       let ingridientPrice = parseInt(value)
//      let resturanOrderPrice = orderQuantity * ingridientPrice
//      let newRestaurantBudget = restaurantBudget - resturanOrderPrice;
//   if(newRestaurantBudget < 0){
//        let message = "RESTAURANT BANKRUPT"
//        return {message, newRestaurantBudget}
//      } else if(orderName in warehousStock){
//       newRestaurantBudget = restaurantBudget - resturanOrderPrice;
//       warehousStock[orderName] = parseInt(warehousStock[orderName]) + orderQuantity
//        resultOfOrder = (orderAction + ", " + orderName + ", " + orderQuantity )
//         return {resultOfOrder, newRestaurantBudget, warehous: {warehousStock}}
//        } else
//        newRestaurantBudget = restaurantBudget - resturanOrderPrice;
//        newParsedWarehouseStock.orderName == orderQuantity
//        resultOfOrder = (orderAction + ", " + orderName + ", " + orderQuantity)
//        return {resultOfOrder, newRestaurantBudget, warehous: {warehousStock}}
//     }
//   }
//   console.log("There is no such order in ingredient list")
  
// };

//  getBudgetAction  (data, newParsedWarehouseStock) {
//   // let restaurantBudget = 500;
//   let newRestaurantBudget = data.val[0];
//   if(data.arg[0] === "="){
//     return newRestaurantBudget = ["Restaurant budget: ", parseInt(data.val[0])]
//   } else if (data.arg[0] === "+") {
//     return newRestaurantBudget = ["Restaurant budget: ", (restaurantBudget + parseInt(data.val[0]))]
//   } else if (data.arg[0] === "-") {
//     return newRestaurantBudget = ["Restaurant budget: ", (restaurantBudget - parseInt(data.val[0]))]
//   } 

// };


// getAuditAction  (auditList) {
//   let outputAuditList = []
//   auditList.forEach(element => {
//     outputAuditList.push("command:" + element.comand + "\n" + "Warehouse:" + JSON.stringify(element.Warehouse) + "\n" + "Budget:" + element.Budget + "\n")
//   });
//   return outputAuditList.join('')
// };

// const compareRestaurentBudget = (getOrderAction, newRestaurantBudget, orderIngridients, baseIngredientsPrices) => {
//   let orderIncome = getOrderPrice(orderIngridients, baseIngredientsPrices)
//     if(parseInt(getOrderAction) > parseInt(newRestaurantBudget)){
//         return ("RESTAURANT BANKRUPT");
//     } else {
//         return ("Restaurant budget:" + (newRestaurantBudget + orderIncome));
// }
// }


const getBuyActions = new BuyAction();
// const getOrderActions = new OrderAction();

module.exports = getBuyActions;
// module.exports = getOrderActions;