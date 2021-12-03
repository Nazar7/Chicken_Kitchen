module.exports = class IngridientsPricesParse {
    constructor(data) {
        this.ingredientsPrices = data.ingredientsPrices;
      }
      parsedIngridientsPrices() {
        let parsIngredientsPrices = {};
        for (let element in this.ingredientsPrices) {
          parsIngredientsPrices[this.ingredientsPrices[element].ingredients] =
          parseInt(this.ingredientsPrices[element].price);
        }
        return parsIngredientsPrices
    }
}
