module.exports = class Dish {
    constructor(dish, BASE_INGREDIENTS, getParsedDishData, getParsedIngridientsPricesData) {
        this.dish = dish;
        this.baseIngredients = BASE_INGREDIENTS;
        this.parsedDishIngredients = getParsedDishData.parsedDishIngredients();
        this.parsedIngridientsPricesData = getParsedIngridientsPricesData.parsedIngridientsPrices();
      }

    //Enzelt
    isBaseIngredient(ingredient) {
        if (this.baseIngredients[0].ingredients.split(',').includes(ingredient)) {
            return true;
        } else {
            return false
        }
    }

    //Sofia

    reduceFromWarehouses () {
        // if (order on the warehouses) {
        //  reduce order from warehouse
        // } else if (components are on the warehouse ) {
        //  reduce components
        // }

    }

      getBaseIngridientsOfDish () {
        let arr = [];
        if (this.isBaseIngredient(this.dish)) {
            arr.push(this.dish)
            return arr;
        }
        this.#_getBaseIngridientsOfDish(this.dish, arr);
        return arr;
      }

      #_getBaseIngridientsOfDish (dish, arr) {
         return this.parsedDishIngredients[dish].map((item) => {
             this.baseIngredients[0].ingredients;
            if (this.baseIngredients[0].ingredients.split(",").includes(item)) {
              // if (!arr.includes(item))
                arr.push(item);
            } else {
              this.#_getBaseIngridientsOfDish(item, arr);
            }
          })

      }

      loadDishPrice () {
          this.dish;
          let arr = this.getBaseIngridientsOfDish();
        let totalOrderPrice = null;
          for (let i = 0;  i < this.getBaseIngridientsOfDish().length; i++){
            for (const [key, value] of Object.entries(this.parsedIngridientsPricesData)) {
                if(key === this.getBaseIngridientsOfDish()[i]){
                  totalOrderPrice += parseInt(value)
                }
            }
          }
          return totalOrderPrice;
      }

}