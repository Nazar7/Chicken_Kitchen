const Dish = require("../dataHandlers/dish.js");
const Customer = require("../dataHandlers/customer.js");
const Allergie = require("../dataHandlers/allergie.js");
const WarehousCalculation = require("../dataHandlers/warehousCalculation.js");

module.exports = class Action {
  constructor(
    BASE_INGREDIENTS_LIST,
    ParsedIngridientsPricesData,
    ParsedDishData,
    ParsedCustomerData,
    PROFIT_TAX_LIST,
    restaurantBudget,
    warehouseStock
  ) {
    this.baseIngridients = BASE_INGREDIENTS_LIST;
    this.parsedIngridientsPricesData = ParsedIngridientsPricesData;
    this.parsedDishData = ParsedDishData;
    this.ParsedCustomerData = ParsedCustomerData;
    this.profitandtaxobjact = PROFIT_TAX_LIST;
    this.restaurantBudget = restaurantBudget;
    this.warehouseStock = {...warehouseStock};
    this.amountOfTableOrder = 0;
    this.tableOrderResult = [];
    this.baseRestaurantBudget = restaurantBudget;
    this.baseWarehouseStock = warehouseStock;
  }

  loadBuyAction(data) {
  
    // console.log(data);
    let expectedData = data.action + ", " + data.arg + ", " + data.val;
    for (let item = 0; item <= data.arg.length - 1; item++) {
      let dish = data.val[item];
      let customer = data.arg[item];
      let customerName = data.arg[item].split(" ")[0];
      let dishObject = new Dish(
        dish,
        this.baseIngridients,
        this.parsedDishData,
        this.parsedIngridientsPricesData
      );
      let customerObject = new Customer(this.ParsedCustomerData, customer);
      let allergieObjact = new Allergie(dish, customer, dishObject.getBaseIngridientsOfDish(), customerObject.loadCustomerAllergieProduct());
      let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish());
      if (
        customerObject.loadCustomerBudget() > dishObject.loadDishPrice() &&
        allergieObjact.checkerAllergie() === "seccess"
      ) {
        let newRestaurantBudget = this.restaurantBudget + (dishObject.loadDishPrice() * (100 + this.profitandtaxobjact["profit margin"])) / 100;
        this.amountOfTableOrder += dishObject.loadDishPrice();
        this.restaurantBudget = newRestaurantBudget;
        this.warehouseStock = warehousObjact.warehousStockDecrease(this.warehouseStock);
        let individualCustomerResult = customer + ", " + customerObject.loadCustomerBudget() + ", " + dish + ", " + dishObject.loadDishPrice();
        this.tableOrderResult.push(individualCustomerResult);
      } else if (allergieObjact.checkerAllergie() !== "seccess") {
        let result = expectedData + " -> " + customerName + ", " + customerObject.loadCustomerBudget() + dish + ", " + dishObject.loadDishPrice() + " -> can’t buy, cannot afford it.";
        return { resultOfOrder: result };
      } else if (customerObject.loadCustomerBudget() < dishObject.loadDishPrice()) {
        let result = expectedData + " -> " + customerName + ", " + customerObject.loadCustomerBudget() + dish + ", XXX -> can’t buy, allergic to " +
          customerObject.loadCustomerAllergieProduct();
        return { resultOfOrder: result };
      }
      if (item === data.arg.length - 1) {
        let result = expectedData + " -> " + "seccess; " + "money amount: " + this.amountOfTableOrder;
        let resObg = customer + ", " + customerObject.loadCustomerBudget() + ", " + dishObject.loadDishPrice();
        return {
          resultOfOrder: result,
          objactResult: this.tableOrderResult,
          warehousStock: {...this.warehouseStock},
          restaurantBudget: this.restaurantBudget,
        };
      }
    }
  }

  loadOrderAction(data) {
    let ordersList = [data.action, data.arg, data.val];
    for (let item = 1; item <= ordersList.length-1; item++) {
      let ingridientName = ordersList[item][0];
      let ingridientQuantity = ordersList[item][1];
      // let customer = data.arg[item];
      // let customerName = data.arg[item].split(" ")[0];
      // let dishObject = new Dish(dish, this.baseIngridients, this.parsedDishData, this.parsedIngridientsPricesData);
      for (const [key, value] of Object.entries(this.parsedIngridientsPricesData.parsedIngridientsPrices())) {
        console.log( this.restaurantBudget)
        if (ingridientName === key) {
          let ingridientPrice = parseInt(value);
          let costOfOrderedIngredient = ingridientQuantity * ingridientPrice;
          this.restaurantBudget = this.restaurantBudget - costOfOrderedIngredient;
          this.warehouseStock[ingridientName] = +this.warehouseStock[ingridientName] + +ingridientQuantity;
          // return {warehousStock: this.warehouseStock, restaurantBudget: this.restaurantBudget}
         
        }
         else 
          this.warehouseStock[ingridientName] = ingridientQuantity;
          let ingridientPrice = parseInt(value);
          let costOfOrderedIngredient = ingridientQuantity * ingridientPrice;
          this.restaurantBudget = this.restaurantBudget - costOfOrderedIngredient;
         
        
        
        // let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish());
      
      } if (this.restaurantBudget < 0) {
        console.log(this.warehouseStock)
        let message = "RESTAURANT BANKRUPT";
        return { message, restaurantBudget: this.restaurantBudget, };
      } else {

        // console.log(this.warehouseStock);
        // console.log(this.restaurantBudget);
      
      }
    }
    console.log(this.warehouseStock)
      return {
          warehousStock: {...this.warehouseStock},
          restaurantBudget: this.restaurantBudget,
        };
  }

  loadBudgetAction(data) {
    let ordersList = [data.action, data.arg, data.val];
      if (data.arg === "=") {
        this.restaurantBudget = data.val;
      } else if (data.arg === "+") {
        this.restaurantBudget += data.val;
      } else if (data.arg === "-") {
        this.restaurantBudget -= data.val;
      }
      return { restaurantBudget: this.restaurantBudget };
  }

  loadAuditAction(data, actionResultsObjact) {
    let ordersList = [data.action, data.arg, data.val];
    console.log(data)
      if (data.val[0] === "Resources") {
        console.log('INIT')
        console.log(this.baseWarehouseStock)
        console.log(this.baseRestaurantBudget)
        console.log(actionResultsObjact)
      }
  }
};
