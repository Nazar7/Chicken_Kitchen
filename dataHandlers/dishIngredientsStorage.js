module.exports = class DishIngredients {
    constructor(order, data, getParsedDishData) {
        this.parsedfoodIngredients = getParsedDishData;
        this.order = order;
        this.baseIngredients = data.baseIngredients;
      }

      getBaseIngridientsOfOrder () {
        let self = this;
        return this.parsedfoodIngredients[this.order].map((item) => {
            if (this.baseIngredients[0].ingredients.split(",").includes(item)) {
              return item;
            }
            this.order = item
            return self.getBaseIngridientsOfOrder();
          })
          .join("" + ", ");
          
      }

}