module.exports = class WarehouseCalculation{
    constructor(order, getBaseIngridientsOfDish) {
        this.order = order;
        // this.warehouse = warehouse;
        this.getBaseIngridientsOfDish = getBaseIngridientsOfDish;
      }

    //Sofia
    checkAllIngredients = (order, componentsOfFood, warehouse, baseIngredients) => {
        let ingredientsFromMenu = food[order];

        for ( let i = 0; i < ingredientsFromMenu.length; i++ ) {
            const checkExistsOfIng = baseIngredients.some(item => warehouse[ingredientsFromMenu[i]] > 0 || ingredientsFromMenu[i] === item);
            if (checkExistsOfIng) {
                componentsOfFood.push(ingredientsFromMenu[i]);
            } else {
                this.checkAllIngredients(ingredientsFromMenu[i], componentsOfFood, warehouse, baseIngredients)
            }
        }
    }

    warehousStockDecrease(warehouse, baseIngredients) {
        // this.order
        const componentsOfFood = [];
          this.checkAllIngredients(this.order, componentsOfFood, warehouse, baseIngredients)
        if(this.order in warehouse && warehouse[this.order] > 0){
            // console.log(this.warehouse)s
            warehouse[this.order] = warehouse[this.order]-1
          return warehouse
        } else {
            // console.log(this.orderIngridients.join())
            for(let i = 0; i <= this.getBaseIngridientsOfDish.length; i++){
                // console.log(this.orderIngridients[i] in this.warehouse)
                if(this.getBaseIngridientsOfDish[i] in warehouse){
                    warehouse[this.getBaseIngridientsOfDish[i]] = warehouse[this.getBaseIngridientsOfDish[i]]-1
                }
            }
        }
          return  warehouse
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

