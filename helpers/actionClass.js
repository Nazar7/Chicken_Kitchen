module.exports = class ActionBuy {
  constructor(restaurantBudget, data, order, customer, cstomerBudget, orderPrice, allergieExist, warehousData) {
      this.restaurantBudget = restaurantBudget;
      this.data = data;
      this.order = order;
      this.customer = customer;
      this.customerBudget = cstomerBudget;
      this.orderPrice = orderPrice;
      this.allergieExist = allergieExist;
      this.warehousData = warehousData
    }

    getBuyAction(){
      let ordersList = [this.data.action, this.data.arg, this.data.val]
      if (this.customerBudget > this.orderPrice && this.allergieExist === "seccess") {
        let resultOfOrder = ordersList + " -> " + this.customer + ", " + this.customerBudget + ", " + this.order + ", " + this.orderPrice + " -> " + this.allergieExist;
        // console.log(resultOfOrder)
        this.restaurantBudget += this.orderPrice * 1.3
        // console.log(this.restaurantBudget)
        // console.log(this.warehousData)
        // let warehouseStock = getDishData.getAllDishIngridients(order, parsefoodIngredients, datasFromFiles.baseIngredients, datasFromFiles.parsedWarehouseStock)
        // newParsedWarehouseStock = warehouseStock[0] 
        return {resultOfOrder, restaurantBudget: this.restaurantBudget, warehous: this.warehousData};
      } else if (customerBudget < orderPrice) {
        let resultOfOrder = ordersList + " -> " + this.customer + ", " + this.customerBudget + ", " + this.order + ", " + "XXX" + " -> " + "NOT INAF MONEY";
        return {resultOfOrder, restaurantBudget: this.restaurantBudget, warehous: this.warehousData};
      } else if (this.alergiExist !== "seccess") {
        let resultOfOrder = this.alergiExist
          return {resultOfOrder, restaurantBudget: this.restaurantBudget, warehous: this.warehousData};
      }
    }

    getBudgetAction(){
      let ordersList = [this.data.action, this.data.arg, this.data.val]
      if (this.data.arg === "=" ) {
        this.restaurantBudget == this.data.val
      } else if (this.data.arg === "+") {
        this.restaurantBudget += this.data.val
      } else if (this.data.arg === "-") {
        this.restaurantBudget -= this.data.val
      }
      return {restaurantBudget: this.restaurantBudget}
    }

    getOrderAction(){
      let ordersList = [this.data.action, this.data.arg, this.data.val]
     console.log(this.warehousData)

     
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
    
      return {restaurantBudget: this.restaurantBudget}
    }

}