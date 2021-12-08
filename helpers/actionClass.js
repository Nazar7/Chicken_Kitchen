const Dish = require("../dataHandlers/dish.js");
const Customer = require("../dataHandlers/customer.js");
const Allergie = require("../dataHandlers/allergie.js");
const WarehousCalculation = require("../dataHandlers/warehousCalculation.js");
const DiscountCouter = require("../dataHandlers/discount ");
const Tax = require("../dataHandlers/tax");


module.exports = class Action {
  constructor(
    BASE_INGREDIENTS_LIST,
    ParsedIngridientsPricesData,
    ParsedDishData,
    ParsedCustomerData,
    PROFIT_TAX_LIST,
    restaurantBudget,
    warehouseStock,
    WAREHOUSE_CONFIG,
    ALLERGIES_WAREHOUSE_CONFIG
  ) {
    this.baseIngridients = BASE_INGREDIENTS_LIST;
    this.parsedIngridientsPricesData = ParsedIngridientsPricesData;
    this.parsedDishData = ParsedDishData;
    this.ParsedCustomerData = ParsedCustomerData;
    this.profitandtaxobjact = PROFIT_TAX_LIST;
    this.restaurantBudget = restaurantBudget;
    this.warehouseStock = {...warehouseStock};
    this.baseWarehousStock = warehouseStock;
    this.amountOfTableOrder = 0;
    this.tableResult = [];
    this.buyActionResult = [];
    this.resultObjact = {};
    this.baseRestaurantBudget = restaurantBudget;
    this.actualCustomerBudget = 0;
    //Enzelt
    this.warehouseConfig = WAREHOUSE_CONFIG;
    this.allergiesWarehouseConfig = ALLERGIES_WAREHOUSE_CONFIG;
    //*******
  }

  loadBuyAction(data) {
    let individualCustomerResult
    let expectedData = data.action + ", " + data.arg + ", " + data.val;
    let collectedTax = 0
    let tableAmountOrder = 0;
    for (let item = 0; item <= data.arg.length - 1; item++) {

      let dish = data.val[item];
      let comand = data.action;
      let customer = data.arg[item];
      let customerName = data.arg[item].split(" ")[0];
      let dishObject = new Dish(
        dish,
        this.baseIngridients,
        this.parsedDishData,
        this.parsedIngridientsPricesData
      );
      let customerObject = new Customer(this.ParsedCustomerData, customer);
      let customerBudget = customerObject.loadCustomerBudget(this.actualCustomerBudget)
      let allergieObjact = new Allergie(dish, customer, dishObject.getBaseIngridientsOfDish(), customerObject.loadCustomerAllergieProduct());
      // let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish());
      if (
          customerBudget > dishObject.loadDishPrice() &&
        allergieObjact.checkerAllergie(
            dishObject,
            this.warehouseStock,
            new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish()),
            this.restaurantBudget,
            this.allergiesWarehouseConfig) === "seccess"
      ) {
        let discountExist = new DiscountCouter().discountCounter(customer, this.profitandtaxobjact["every third discount"])
        let profitFromDish = dishObject.loadDishPrice() * (this.profitandtaxobjact["profit margin"] / 100)
        let dishPriceForCustomer = profitFromDish + dishObject.loadDishPrice();
        let texsObjact = new Tax(this.profitandtaxobjact["every third discount"], this.profitandtaxobjact["transaction tax"], dishPriceForCustomer)
        if(discountExist) {
              let individualCustomerOrderAmount = dishObject.loadDishPrice() - texsObjact.getTaxAndDiscountObjact().restaurantDiscoumt
            }
              let individualCustomerOrderAmount = dishObject.loadDishPrice()
        this.amountOfTableOrder += dishObject.loadDishPrice() + profitFromDish;

        let newRestaurantBudget = (this.restaurantBudget + dishPriceForCustomer) - texsObjact.getTaxAndDiscountObjact().restaurantTransactionTax;
        this.restaurantBudget = newRestaurantBudget;
        let restaurantProfit =  parseFloat((this.restaurantBudget - this.baseRestaurantBudget - collectedTax).toFixed(2))
        // this.warehouseStock = warehousObjact.warehousStockDecrease(this.warehouseStock);
        collectedTax += texsObjact.getTaxAndDiscountObjact().restaurantTransactionTax;
        if(data.arg.length > 1) {
          individualCustomerResult = customer + ", " + customerBudget + ", " + dish + ", " + Math.ceil(dishPriceForCustomer)
          tableAmountOrder += Math.ceil(dishPriceForCustomer)
          this.tableResult.push(individualCustomerResult)
        }

        // return this.resultObjact
      }
      else if (allergieObjact.checkerAllergie(
          dishObject,
          this.warehouseStock,
          new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish()),
          this.restaurantBudget,
          this.allergiesWarehouseConfig
      ) !== "seccess") {
        let result = expectedData + " -> " + customerName + ", " + customerBudget + ', ' +
            dish + ", XXX -> can’t buy, allergic to " +
            customerObject.loadCustomerAllergieProduct();

        this.resultObjact = { resultOfOrder: result }
        // return this.buyActionResult.push(this.resultObjact);
        return this.resultObjact
      }
      else if (customerBudget < dishObject.loadDishPrice()) {
        let result = expectedData + " -> " + customerName + ", " + customerBudget + dish + ", " +
            dishObject.loadDishPrice() + " -> can’t buy, cannot afford it.";
        this.resultObjact = { resultOfOrder: result }
        return this.buyActionResult.push(this.resultObjact);
      }
      let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish());
      this.warehouseStock = warehousObjact.warehousStockDecrease(this.warehouseStock);
      if (item === data.arg.length - 1) {

        let resTableOrder = expectedData + " -> success; money amount: " + tableAmountOrder;
        let resultSinglCustomer = expectedData + " -> " + customerName + ', ' +
            customerBudget+ ', ' +  dish + ', ' + (comand === 'Table') ? resTableOrder :
            dishObject.loadDishPrice() + ' -> ' + 'success'
        // this.actualCustomerBudget = customerBudget - dishObject.loadDishPrice();
        this.resultObjact = {
          resultOfTable: (data.arg.length > 1) ? this.tableResult : '',
          resultOfOrder: (!resTableOrder) ? resTableOrder : resultSinglCustomer,
          command: comand,
          Warehouse: {...this.warehouseStock},
          Budget: this.restaurantBudget,
        };
        this.buyActionResult.push(this.resultObjact)
        return this.resultObjact
      }
    }
    this.tableResult = []
    this.actualCustomerBudget = 0;
    return this.resultObjact
  }

  //Enzelt
  isBaseIngredient(ingredient) {
    if (this.baseIngridients[0].ingredients.split(',').includes(ingredient)) {
      return true;
    } else {
      return false
    }
  }

  getTotalWarehouseQuantity() {
    let quantity = 0;
    Object.values(this.warehouseStock).map((item) => {
      quantity += parseInt(item);
    });
    return quantity;
  }

  //Enzelt 6.7.4
  checkWarehouseConfig(ingredientName, ingridientQuantity) {
    let wastedData = {
      wasted: 0,
      canOrder: 0,
      message: '',
    };
    let wantToAdd = ingridientQuantity;

    const maxAllowedIngredients =  this.warehouseConfig.max_ingredient_type;
    const maxAllowedDishes = this.warehouseConfig.max_dish_type;

    let canOrder = 0;
    let wasted = 0;

    let currentQuantity = this.warehouseStock[ingredientName];

    const totalWarehouseQuantity = this.getTotalWarehouseQuantity();

    // Перевіряю чи базовий інгредієнт чи ні,
    // відповідно до цього визначаю скліьки можна замовити(згідно до конфігів)
    if (this.isBaseIngredient(ingredientName)) {
      canOrder = maxAllowedIngredients - currentQuantity;
    } else {
      canOrder = maxAllowedDishes - currentQuantity;
    }

    // перевіряю чи те, що можемо додати більше нуля,  але також перевіряємо
    // чи часом ми не хочемо замовити більше ніж можемо, якщо так, то шукаємо
    if (canOrder > 0 && canOrder < wantToAdd) {
      wasted = wantToAdd - canOrder;
      wastedData.message += 'Limit of ingredient/dish reached partially' + "\r\n";
    }

    if (canOrder <= 0) {
      canOrder = 0;
      wastedData.wasted = wantToAdd;
      wastedData.canOrder = canOrder;
      wastedData.message += 'Total limit of ingredient/dish reached' + "\r\n";
      return wastedData;
    }

    if (totalWarehouseQuantity + canOrder > this.warehouseConfig.total_maximum) {
      //458 + 5 - 500 = 3
      let difference = totalWarehouseQuantity + canOrder - this.warehouseConfig.total_maximum;
      if ((totalWarehouseQuantity + canOrder - this.warehouseConfig.total_maximum) > 0) {
        wasted = canOrder - difference;
        canOrder = difference;
      }
      wastedData.wasted = wasted;
      wastedData.canOrder = canOrder;
      wastedData.message += 'Total limit reached' + "\r\n";
    }

    wastedData.wasted = wasted;
    wastedData.canOrder = canOrder;
    return wastedData;
  }


  loadOrderAction(data) {
    let ordersList = [data.action, data.arg, data.val];

    let wastedData = {};
    for (let item = 1; item <= ordersList.length-2; item++) {
      let ingridientName = ordersList[item][0];
      let ingridientQuantity = ordersList[item + 1][0];

      //Enzelt 6.7.4
      wastedData = this.checkWarehouseConfig(ingridientName, ingridientQuantity);
      ingridientQuantity = wastedData.canOrder;
      //******

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
    let expectedData = data.action + ", " + data.arg + ", " + data.val;
    let result = expectedData + " -> "
        + " Problems: " + wastedData.message
        + " Result: " +  data.action + ", " + data.arg + ", " + wastedData.canOrder;
    return {
      command: result,
      Warehouse: {...this.warehouseStock},
      Budget: this.restaurantBudget,
      wastedData: wastedData,
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
