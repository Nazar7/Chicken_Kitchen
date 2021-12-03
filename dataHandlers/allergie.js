module.exports = class Allergie{
    constructor(dish, customer, getBaseIngridientsOfDish, loadCustomerAllergieProduct) {
        this.dish = dish;
        this.customer = customer;
        this.getBaseIngridientsOfDish = getBaseIngridientsOfDish;
        this.loadCustomerAllergieProduct = loadCustomerAllergieProduct;
      }

checkerAllergie() {
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
         return data
      }
      exist = false;
       data = "seccess";
      //  console.log(data)
       return data
    }
//   }
}