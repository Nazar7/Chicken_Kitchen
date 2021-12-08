const WarehousCalculation = require("../dataHandlers/warehousCalculation.js");
module.exports = class Allergie{
    constructor(dish, customer, getBaseIngridientsOfDish, loadCustomerAllergieProduct) {
        this.dish = dish;
        this.customer = customer;
        this.getBaseIngridientsOfDish = getBaseIngridientsOfDish;
        this.loadCustomerAllergieProduct = loadCustomerAllergieProduct;
      }

    processAllergiesWarehouse(keep, dishObject, warehouseStockObject, warehouseObject, restaurantBudgetObject, data) {
        if (!keep) {
            warehouseStockObject = warehouseObject.warehousStockDecrease(warehouseStockObject);
            data += '; Wasted due to configuration!';
        } else {
            let reduceMoney = '';
            let newRestaurantBudget =
                (restaurantBudgetObject - (dishObject.loadDishPrice() + dishObject.loadDishPrice() * 0.25));
            if (newRestaurantBudget < restaurantBudgetObject) {
                restaurantBudgetObject = newRestaurantBudget;
                reduceMoney = 'Reduce money from budget: ' +  restaurantBudgetObject;
            }
            data += '; Keep due to configuration! ' + reduceMoney;
        }
        return data;
    }

checkerAllergie(dishObject, warehouseStockObject, warehouseObject, restaurantBudgetObject, allergiesWarehouseConfig) {
    let data = "";
    let exist = false;
    let item = this.getBaseIngridientsOfDish
      const found = this.getBaseIngridientsOfDish.some((element) =>
      this.loadCustomerAllergieProduct.includes(element)
      
      );
      if (found) {
        exist = true;
        data = this.customer + " - " + "can’t order " + this.order + " allergic to: " + this.loadCustomerAllergieProduct.join();
        // console.log(data)

          //Enzelt 6.7.5
          switch (allergiesWarehouseConfig.dishes_with_allergies) {
              case 'waste':
                  data = this.processAllergiesWarehouse(
                      false,
                      dishObject,
                      warehouseStockObject,
                      warehouseObject,
                      restaurantBudgetObject,
                      data);
                  break;
              case 'keep':
                  data = this.processAllergiesWarehouse(
                      true,
                      dishObject,
                      warehouseStockObject,
                      warehouseObject,
                      restaurantBudgetObject,
                      data);
                  break;
              default:
                 if (parseFloat(dishObject.loadDishPrice()) > allergiesWarehouseConfig.dishes_with_allergies) {
                     data = this.processAllergiesWarehouse(
                          true,
                          dishObject,
                          warehouseStockObject,
                          warehouseObject,
                          restaurantBudgetObject,
                          data);
                  } else {
                  data = this.processAllergiesWarehouse(
                          false,
                          dishObject,
                          warehouseStockObject,
                          warehouseObject,
                          restaurantBudgetObject,
                          data);
                  }
                  break;
          }
          //************

         return data
      }
      exist = false;
       data = "seccess";
      //  console.log(data)
       return data
    }
//   }
}