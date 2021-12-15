const spoiling = require('./spoilingService');

module.exports = class WarehouseCalculation{
    constructor(order, getBaseIngridientsOfDish, parsedDishIngredients) {
        this.order = order;
        // this.warehouse = warehouse;
        this.getBaseIngridientsOfDish = getBaseIngridientsOfDish;
        this.parsedDishIngredients = parsedDishIngredients;
    }
    //

    //Sofia
    checkAllIngredients = (order, componentsOfFood, warehouse, baseIngredients) => {
        // let ingredientsFromMenu = food[order];
        const ingredientsFromMenu = this.parsedDishIngredients[order];

        for ( let i = 0; i < ingredientsFromMenu.length; i++ ) {
            const checkExistsOfIng = baseIngredients.some(item => warehouse[ingredientsFromMenu[i]] > 0 || ingredientsFromMenu[i] === item);
            if (checkExistsOfIng) {
                componentsOfFood.push(ingredientsFromMenu[i]);
            } else {
                this.checkAllIngredients(ingredientsFromMenu[i], componentsOfFood, warehouse, baseIngredients)
            }
        }
    }

    getAmountFromWarehouse = (warehouses, ingredient) => {
        return warehouses[ingredient];
    }

    warehousStockDecrease(warehouse, baseIngredients) {
        // this.order
        const spoilRate = 10;
        const componentsOfFood = [];
          this.checkAllIngredients(this.order, componentsOfFood, warehouse, baseIngredients)
        if(this.order in warehouse && warehouse[this.order] > 0){
            warehouse[this.order] = warehouse[this.order]-1
          return warehouse
        } else {
            // console.log(this.orderIngridients.join())
            for(let i = 0; i <= componentsOfFood.length; i++){
                // console.log(this.orderIngridients[i] in this.warehouse)
                if(componentsOfFood[i] in warehouse){
                    warehouse[componentsOfFood[i]] = warehouse[componentsOfFood[i]]-1
                }
            }
        }
        return  [warehouse, componentsOfFood]
    }

    reduceSpoilingFoodFromWarehouse(baseIngredients, warehouse, order) {
        let message;
        let amountOfSpoiling = 0;
        let componentsOfFood;
        const parsedIngedients = baseIngredients[0].ingredients.split(',');
        componentsOfFood = this.warehousStockDecrease(warehouse, baseIngredients)[1];
        const spoilRate = 10;
        // componentsOfFood.length > 0 ? componentsOfFood : componentsOfFood.push(warehouse[order])
        if (!componentsOfFood) {
            const component = warehouse[order];
            const ingredientQuantity = this.getAmountFromWarehouse(warehouse, component)
            amountOfSpoiling = spoiling.checkAmountOfSpoiling(ingredientQuantity, spoilRate);
            if (amountOfSpoiling > 0) {
                warehouse[component] = warehouse[component] - amountOfSpoiling
                message = `${component} spoiled: ${amountOfSpoiling}; `;
            }
        } else {
            componentsOfFood.forEach(component => {
                if (parsedIngedients.includes(component)) {
                    const ingredientQuantity = this.getAmountFromWarehouse(warehouse, component)
                    const amountOfSpoiling = spoiling.checkAmountOfSpoiling(ingredientQuantity, spoilRate);
                    if (amountOfSpoiling > 0) {
                        warehouse[component] = warehouse[component] - amountOfSpoiling
                        message = `${component} spoiled: ${amountOfSpoiling}; `;
                    }
                }
            })
        }
        return message;
    }

    warehousStockIncrise(){
        if(this.order.join() in this.warehouse){
            console.log(this.warehouse)
            this.warehouse[order.join()] = this.warehouse[order.join()]-1
          return this.warehouse
        } else {
            console.log(this.orderIngridients)
            for(let i = 0; i <= this.orderIngridients.length; i++){
                console.log(this.orderIngridients[i] in this.warehouse)
                if(this.orderIngridients[i] in this.warehouse){
                    this.warehouse[this.orderIngridients[i]] = this.warehouse[this.orderIngridients[i]]-1
                    console.log(this.warehouse)
                 return  this.warehouse
                
                }
            }
        }
    }

}

