const Dish = require("../dataHandlers/dish.js");
const Customer = require("../dataHandlers/customer.js");
const Allergie = require("../dataHandlers/allergie.js");
const WarehousCalculation = require("../dataHandlers/warehousCalculation.js");
const discount = require("../dataHandlers/discount ");
const Tax = require("../dataHandlers/tax");
const spoilingService = require('../dataHandlers/spoilingService');
const spoilRate = require('../data/spoilRate.json');
const wasteLimit = require('../data/trashConfiguration.json');
const trashService = require('../dataHandlers/trashService');
const dataWriter = require('../services/addDataToFile');
const trash = trashService.getTrash();
const tipsService = require('../dataHandlers/tips')
const tips = tipsService.getTipsValue()

module.exports = class Action {
  constructor(
    BASE_INGREDIENTS_LIST,
    ParsedIngridientsPricesData,
    ParsedDishData,
    ParsedCustomerData,
    PROFIT_TAX_LIST,
    restaurantBudget,
    warehouseStock,
    //Enzelt
    WAREHOUSE_CONFIG,
    ALLERGIES_WAREHOUSE_CONFIG,
    ORDER_CONFIG
    //*****
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
    this.orderConfig = ORDER_CONFIG;
    //*******
  }

  loadBuyAction(data) {
    const poisoned = trashService.getPoisoned();
    if (!poisoned) {
      let individualCustomerResult
      let expectedData = data.action + ", " + data.arg + ", " + data.val;
      let collectedTax = 0
      let tableAmountOrder = 0;
      for (let item = 0; item <= data.arg.length - 1; item++) {
        let individualCustomerOrderAmount = 0;
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
        let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish(), dishObject.parsedDishIngredients);
        const trash = trashService.getTrash();

        let ifAllergy =  allergieObjact.checkerAllergie(
            dishObject,
            this.warehouseStock,
            new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish(), dishObject.parsedDishIngredients),
            this.restaurantBudget,
            this.allergiesWarehouseConfig,
            this.baseIngridients,
            wasteLimit["waste limit"], trash)
        if (
            customerBudget > dishObject.loadDishPrice() &&
            ifAllergy === "success"
        ) {
          let discountExist = discount.discountCounter(customer, this.profitandtaxobjact["every third discount"])
          let profitFromDish = dishObject.loadDishPrice() * (this.profitandtaxobjact["profit margin"] / 100)
          let dishPriceForCustomer = profitFromDish + dishObject.loadDishPrice() - individualCustomerOrderAmount;
          let texsObjact = new Tax(this.profitandtaxobjact["every third discount"], this.profitandtaxobjact["transaction tax"], dishPriceForCustomer)
          let tipAmount =  tipsService.getTipsValue()
          console.log(" tipAmount - " + tipAmount)
          //Sofia fix
          if(discountExist) {
            individualCustomerOrderAmount = texsObjact.getTaxAndDiscountObjact().restaurantDiscoumt //dishObject.loadDishPrice() -
          }
          this.amountOfTableOrder += dishObject.loadDishPrice() + profitFromDish;
          //Sofia 6.8.2
          let messageAboutSpoiling;
          messageAboutSpoiling = warehousObjact.reduceSpoilingFoodFromWarehouse(this.baseIngridients, this.warehouseStock, dish, spoilRate['spoil rate'], trash)
          !messageAboutSpoiling ? this.warehouseStock = warehousObjact.warehousStockDecrease(this.warehouseStock, this.baseIngridients)[0] : messageAboutSpoiling;


          let newRestaurantBudget = (this.restaurantBudget + dishPriceForCustomer) - texsObjact.getTaxAndDiscountObjact().restaurantTransactionTax - individualCustomerOrderAmount;
          this.restaurantBudget = newRestaurantBudget;
          let restaurantProfit =  parseFloat((this.restaurantBudget - this.baseRestaurantBudget - collectedTax).toFixed(2))
          collectedTax += texsObjact.getTaxAndDiscountObjact().restaurantTransactionTax;
          if(data.arg.length > 1) {
            individualCustomerResult = customer + ", " + customerBudget + ", " + dish + ", " + Math.ceil(dishPriceForCustomer)
            tableAmountOrder += Math.ceil(dishPriceForCustomer)
            this.tableResult.push(individualCustomerResult)
          }
          // const trash = trashService.getTrash();
          const command = `${data.action}, ${data.arg}, ${data.val} => ${customer}, ${customerBudget}, ${dish} => success, discount: ${individualCustomerOrderAmount}; ${messageAboutSpoiling ? messageAboutSpoiling : '' }`
          return { Budget: this.restaurantBudget, command, Warehouse: {...this.warehouseStock}, trashCopy: {...trash} };
          // return this.resultObjact
        }
        else if (ifAllergy !== "success") {
          let result = expectedData + " -> " + customerName + ", " + customerBudget + ', ' +
              dish + ", XXX -> can’t buy, allergic to " +
              customerObject.loadCustomerAllergieProduct();

          this.resultObjact = { resultOfOrder: result }
          // return this.buyAction
          // Result.push(this.resultObjact);
          // return this.resultObjact
          const command = `${JSON.stringify(this.resultObjact.resultOfOrder)}`
          const trash = trashService.getTrash();
          return { Budget: this.restaurantBudget, command, Warehouse: {...this.warehouseStock}, trashCopy: {...trash} };

        }
        else if (customerBudget < dishObject.loadDishPrice()) {
          let result = expectedData + " -> " + customerName + ", " + customerBudget + dish + ", " +
              dishObject.loadDishPrice() + " -> can’t buy, cannot afford it.";
          this.resultObjact = { resultOfOrder: result }
          return this.buyActionResult.push(this.resultObjact);
        }
        // let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish());
        this.warehouseStock = warehousObjact.warehousStockDecrease(this.warehouseStock,  this.baseIngridients)[0];
        if (item === data.arg.length - 1) {

          let resTableOrder = expectedData + " -> success; money amount: " + tableAmountOrder;
          let resultSinglCustomer = expectedData + " -> " + customerName + ', ' +
          customerBudget+ ', ' +  dish + ', ' + (comand === 'Table') ? resTableOrder :
              dishObject.loadDishPrice() + ' -> ' + 'success, discount: ' + individualCustomerOrderAmount
          // this.actualCustomerBudget = customerBudget - dishObject.loadDishPrice();
          this.resultObjact = {
            resultOfTable: (data.arg.length > 1) ? this.tableResult : '',
            resultOfOrder: (!resTableOrder) ? resTableOrder : resultSinglCustomer,
            command: comand,
            Warehouse: {...this.warehouseStock},
            Budget: this.restaurantBudget,
          };
          this.buyActionResult.push(this.resultObjact)
          // return this.resultObjact
          const trash = trashService.getTrash();
          const command = `${JSON.stringify(this.resultObjact.resultOfOrder)}`
          return { Budget: this.restaurantBudget, command, Warehouse: {...this.warehouseStock}, trashCopy: { ... trash} };
        }
      }
      this.tableResult = []
      this.actualCustomerBudget = 0;
      // return this.resultObjact
      const trash = trashService.getTrash();
      const command = `${data.action}, ${data.arg}, ${data.val} => ${this.resultObjact}`
      return { Budget: this.restaurantBudget, command, Warehouse: {...this.warehouseStock}, trashCopy: {...trash} };
    }
    else {
      return {
        command: `${data.action}, ${data.arg}, ${data.val} => Restaurant Poisoned`,
        Warehouse: {...this.warehouseStock},
        Budget: this.restaurantBudget,
        trashCopy: {... trash}
      };
    }
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

    let currentQuantity = this.warehouseStock[`${ingredientName}`];

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

  checkOrderConfig(ingredientName, ingridientQuantity) {

    let orderConfig = this.orderConfig.order;
    let orderConfigData = {
      canOrder: ingridientQuantity,
      message: ''
    };
    const isBase = this.isBaseIngredient(ingredientName);

    if (orderConfig === 'all') {
      orderConfigData.message = 'Can order all';
      return orderConfigData;
    }
    if (orderConfig === 'no') {
      orderConfigData.canOrder = 0;
      orderConfigData.message = 'Can`t order all';
      return orderConfigData;
    }
    if (isBase && orderConfig === 'ingredients') {
      orderConfigData.message = 'Can order ingredient';
      return orderConfigData;
    } else if(!isBase && orderConfig === 'dish') {
      orderConfigData.message = 'Can order dish';
      return orderConfigData;
    } else {
      orderConfigData.message = 'Can`t order ingredient/dish';
      return orderConfigData;
    }

    switch (this.orderConfig) {
      case 'ingredients':
    }
    return orderConfigData;
  }


  loadOrderAction(data) {
    const poisoned = trashService.getPoisoned();
    if (!poisoned) {
      let ordersList = [data.action, data.arg];
      let orderConfigData = {};
      let wastedData = {};
      ordersList.shift();
      const orderActionForEachArray = ordersList[0].map((item) => {
        let ingridientName = item[0];
        let ingridientQuantity = item[1];
        let spoilingAmount = 0;
        const dishService = new Dish(
            ingridientName, this.baseIngridients, this.parsedDishData, this.parsedIngridientsPricesData
        );
        const isBaseIngredient = dishService.isBaseIngredient(ingridientName);
        // Sofia 6.8.2 (spoiling)       // Sofia 6.8.3 (trash)
        if (isBaseIngredient) {
          spoilingAmount = spoilingService.checkAmountOfSpoiling(ingridientQuantity, spoilRate['spoil rate']);
          if (spoilingAmount > 0) {
            trashService.trashService(wasteLimit, trashService.getTrash(), spoilingAmount, ingridientName)
          }
        }

        //Enzelt 6.7.7 (check order config) //no, ingredients, dish, all
        orderConfigData = this.checkOrderConfig(ingridientName, ingridientQuantity);
        ingridientQuantity = orderConfigData.canOrder;
        //Enzelt 6.7.4
        wastedData = this.checkWarehouseConfig(ingridientName, ingridientQuantity);
        //Sofia fix
        ingridientQuantity = ingridientQuantity <= wastedData.canOrder ? ingridientQuantity - spoilingAmount : wastedData.canOrder - spoilingAmount;
        //Sofia fix price
        let ingridientPrice
        if (isBaseIngredient) {
          ingridientPrice = this.parsedIngridientsPricesData.parsedIngridientsPrices()[ingridientName]
        }  else {
          ingridientPrice = dishService.loadDishPrice();
        }
        // Sofia 6.8.2: add spoilingAmount
        let costOfOrderedIngredient = (ingridientQuantity + spoilingAmount) * ingridientPrice;
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
        let expectedData = data.action + ", " + data.arg;

        //Sofia 6.8.3
        let dishObject = new Dish(
            ingridientName,
            this.baseIngridients,
            this.parsedDishData,
            this.parsedIngridientsPricesData
        );
        const baseIngredients = dishObject.getBaseIngridientsOfDish();
        const trash = trashService.getTrash();

        baseIngredients.forEach(ingredient => {
          trashService.trashService(wasteLimit, trash, wastedData.wasted, ingredient)
        });


        //Sofia fix
        let result = `${expectedData} => ${ingridientName}, ${item[1]} => Success: ${ingridientQuantity}, Wasted: ${wastedData.wasted}, Spoiling: ${spoilingAmount} \r\n`
        return result;
      });
      const trash = trashService.getTrash();
      return {
        command: orderActionForEachArray,
        Warehouse: {...this.warehouseStock},
        Budget: this.restaurantBudget,
        wastedData: wastedData,
        trashCopy: {... trash}
      };
    } else {
      return {
        command: `${data.action}, ${data.arg}, ${data.val} => Restaurant Poisoned`,
        Warehouse: {...this.warehouseStock},
        Budget: this.restaurantBudget,
        trashCopy: {... trash}
      };
    }
  }

  loadBudgetAction(data, skipReduce = false) {
    let ordersList = [data.action, data.arg, data.val];
      if (data.arg[0] === "=") {
        this.restaurantBudget = data.val[0];
      } else if (data.arg[0] === "+") {
        this.restaurantBudget += parseInt(data.val[0]); //Sofia fix
      } else if (data.arg[0] === "-") {
        if (!skipReduce) this.restaurantBudget -= data.val[0];
      }
      //Sofia fix: add to audit
      const command = `${data.action}, ${data.arg}, ${data.val} => Budget: ${this.restaurantBudget}`
    const trash = trashService.getTrash();
    return { Budget: this.restaurantBudget, command, Warehouse: {...this.warehouseStock}, trashCopy: {... trash} };
  }

  //Sofia 684
  loadThrowTrashAway(data) {
    const wastePool = trashService.addToWastePool();


    dataWriter.writeFile('./output/waste_pool.json', JSON.stringify(wastePool));

    trashService.cleaner(); //очистити смітник
    const trash = trashService.getTrash();

    const command = `${data.action} => ${data.action}`

    return { Budget: this.restaurantBudget, command, Warehouse: {...this.warehouseStock}, trashCopy: {... trash} };
  }

  loadAuditAction(data, actionResultsObjact) {
    let ordersList = [data.action, data.arg, data.val];
    let outputAuditList = []
      if (data.val[0] === "Resources") {
        actionResultsObjact.forEach(element => {
          outputAuditList.push(
              "\n\r ===> command:" + element.command + "\n" +
              "Warehouse:" + JSON.stringify(element.Warehouse) + "\n" +
              "Budget:" + element.Budget + "\n" +
              "Trash:" + JSON.stringify(element.trashCopy) + "\n" +
              '____________________________________________________________________________________________________________________^^________________'
          )
        });
        outputAuditList.unshift(
            'INIT' + "\n" +
            "Warehouse: " +  JSON.stringify( this.baseWarehousStock) + "\n" +
            "Budget: " + this.baseRestaurantBudget + "\n" +
            "Trash: " + "{}" + "\n" +
            "START" + "\n"
        )
        outputAuditList.push("\n AUDIT END")
        return outputAuditList.join('')
        }
      }
};
