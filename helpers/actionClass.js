const Dish = require("../dataHandlers/dish.js");
const Customer = require("../dataHandlers/customer.js");
const Allergie = require("../dataHandlers/allergie.js");
const WarehousCalculation = require("../dataHandlers/warehousCalculation.js");
const DiscountCouter = require("../dataHandlers/discount ");


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
    // console.log(this.restaurantBudget);
    this.warehouseStock = {...warehouseStock};
    this.baseWarehousStock = warehouseStock;
    this.amountOfTableOrder = 0;
    this.tableOrderResult = [];
    this.baseRestaurantBudget = restaurantBudget;
  }

  loadBuyAction(data) {
    let expectedData = data.action + ", " + data.arg + ", " + data.val;
    let collectedTax = 0
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
        let discountExist = new DiscountCouter().discountCounter(customer, this.profitandtaxobjact["every third discount"])
        let profitFromDish = dishObject.loadDishPrice() * (this.profitandtaxobjact["profit margin"]) / 100
        let dishPriceForCustomer = profitFromDish + dishObject.loadDishPrice()
          if(!this.profitandtaxobjact["transaction tax"] && !this.profitandtaxobjact["every third discount"]){
            let restaurantTransactionTax = 0.1
            let restaurantDiscoumt = 0.1
            // return restaurantTransactionTax = 0.1
          }
            let restaurantTransactionTax = dishPriceForCustomer * (this.profitandtaxobjact["transaction tax"] / 100)
            collectedTax += +parseFloat(restaurantTransactionTax).toPrecision(2);
        let restaurantDiscoumt = dishPriceForCustomer * (this.profitandtaxobjact["every third discount"] / 100)
        // return restaurantTransactionTax = restaurantProfit * (100 + this.profitandtaxobjact["transaction tax"]) / 100
            if(discountExist) {
              let individualCustomerOrderAmount = dishObject.loadDishPrice() - restaurantDiscoumt
            }
              let individualCustomerOrderAmount = dishObject.loadDishPrice()
        this.amountOfTableOrder += dishObject.loadDishPrice();
        let newRestaurantBudget = this.restaurantBudget + dishPriceForCustomer - restaurantTransactionTax;
        this.restaurantBudget = newRestaurantBudget;
        let restaurantProfit =  this.restaurantBudget - this.baseRestaurantBudget - collectedTax
        this.warehouseStock = warehousObjact.warehousStockDecrease(this.warehouseStock);
        let individualCustomerResult = customer + ", " + customerObject.loadCustomerBudget() + ", " + dish + ", " + dishObject.loadDishPrice();
        this.tableOrderResult.push(individualCustomerResult);
      }
      else if (allergieObjact.checkerAllergie() !== "seccess") {
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
          command: this.tableOrderResult,
          Warehouse: this.warehouseStock,
          Budget: this.restaurantBudget,
        };
      }
    }
  }

  loadOrderAction(data) {
    let ordersList = [data.action, data.arg, data.val];
    let expectedData = data.action + ", " + data.arg + ", " + data.val;
    for (let item = 1; item <= ordersList.length-1; item++) {
      let ingridientName = ordersList[item][0];
      let ingridientQuantity = ordersList[item][1];
        if ( this.restaurantBudget > 0) {
          let ingridientPrice = this.parsedIngridientsPricesData.parsedIngridientsPrices()[ingridientName]
          let costOfOrderedIngredient = ingridientQuantity * ingridientPrice;
          if(!this.profitandtaxobjact["transaction tax"]){
            let restaurantTransactionTax
            return restaurantTransactionTax = costOfOrderedIngredient * (100 + 10) / 100
          }
          let restaurantTransactionTax  = costOfOrderedIngredient * (this.profitandtaxobjact["transaction tax"] / 100)
          this.restaurantBudget = this.restaurantBudget - (costOfOrderedIngredient + restaurantTransactionTax)
          if(this.warehouseStock[ingridientName] === undefined){
            this.warehouseStock[ingridientName] = ingridientQuantity
          } else {
            this.warehouseStock[ingridientName] = +this.warehouseStock[ingridientName] + +ingridientQuantity;
          }
        }  else {
          let message = "RESTAURANT BANKRUPT";
          return { message, restaurantBudget: this.restaurantBudget, warehousStock: this.warehouseStock};
        } 

    }
    let result = expectedData + " -> " + "seccess";
    return {
      command: result,
      Warehouse: {...this.warehouseStock},
      Budget: this.restaurantBudget,
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
    let outputAuditList = []
      if (data.val[0] === "Resources") {
        actionResultsObjact.forEach(element => {
          outputAuditList.push(
              "command:" + element.command + "\n" +
              "Warehouse:" + JSON.stringify(element.Warehouse) + "\n" +
              "Budget:" + element.Budget + "\n"
          )
        });
        outputAuditList.unshift(
            'UNIT' + "\n" +
            "Warehouse: " +  JSON.stringify( this.baseWarehousStock) + "\n" +
            "Budget: " + this.baseRestaurantBudget + "\n" +
            "START" + "\n"
        )
        outputAuditList.push("AUDIT END")
        return outputAuditList.join('')
        }
      }

};
