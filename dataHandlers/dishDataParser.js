
module.exports = class DishDataParse {
    constructor(data) {
        this.data = data.foodIngredients;
      }
      
    parsedDishIngredients () {
        let parsedData = {};
        for (let element in this.data) {
          parsedData[this.data[element].food] =
          this.data[element].ingredients.split(", ");
        }
        return parsedData
    }

}