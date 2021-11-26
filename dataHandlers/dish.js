module.exports = class Dish {
    constructor(dish, BASE_INGREDIENTS, getParsedDishData, getParsedIngridientsPricesData) {
        this.dish = dish;
        this.baseIngredients = BASE_INGREDIENTS;
        this.parsedDishIngredients = getParsedDishData.parsedDishIngredients();
        this.parsedIngridientsPricesData = getParsedIngridientsPricesData.parsedIngridientsPrices();
      }

      getBaseIngridientsOfDish () {
        let arr = []
        this.#_getBaseIngridientsOfDish(this.dish, arr);
        return arr;
      }

      #_getBaseIngridientsOfDish (dish, arr) {
         return this.parsedDishIngredients[dish].map((item) => {
            if (this.baseIngredients[0].ingredients.split(",").includes(item)) {
              if (!arr.includes(item))
                arr.push(item);
            } else {
              this.#_getBaseIngridientsOfDish(item, arr);
            }
          })
      }

      loadDishPrice () {
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