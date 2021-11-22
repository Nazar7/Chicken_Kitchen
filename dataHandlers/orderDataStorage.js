module.exports = class OrderData {
    constructor(order, data, getParsedDishData, getParsedIngridientsPricesData) {
        this.order = order;
        this.baseIngredients = data.baseIngredients;
        this.parsedDishIngredients = getParsedDishData;
        this.parsedIngridientsPricesData = getParsedIngridientsPricesData;
      }

      getBaseIngridientsOfOrder () {
        // console.log(this.ingredientsPrices)
        // console.log(this.parsedDishIngredients)
        // console.log(this.order)
        // console.log(this.baseIngredients)
       
        let self = this;
        return this.parsedDishIngredients[this.order].map((item) => {
            if (this.baseIngredients[0].ingredients.split(",").includes(item)) {
              return item;
            }
            this.order = item
            return self.getBaseIngridientsOfOrder();
          })
          
      }

      getOrderPrice () {
        let totalOrderPrice = null;
          for (let i = 0;  i < this.getBaseIngridientsOfOrder().length; i++){
            for (const [key, value] of Object.entries(this.parsedIngridientsPricesData)) {
                if(key === this.getBaseIngridientsOfOrder()[i]){
                  totalOrderPrice += parseInt(value)
                }
            }
          }
          console.log(totalOrderPrice)
          return totalOrderPrice;
      }

}