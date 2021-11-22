module.exports = class OrderAllergiExist{
    constructor(order, customer, baseIngridientsOfOrder, customerAllergieProduct) {
        this.order = order;
        this.customer = customer;
        this.baseIngridientsOfOrder = baseIngridientsOfOrder;
        this.customerAllergieProduct = customerAllergieProduct;
      }
getOrderAllergiExist() {
    let data = "";
    let exist = false;
    // console.log(this.order)
    // console.log(this.customer)
    console.log(this.baseIngridientsOfOrder)
    let item = this.baseIngridientsOfOrder
    // console.log(item.split(''))
    // console.log(this.customerAllergieProduct)
      const found = this.baseIngridientsOfOrder.some((element) =>
      this.customerAllergieProduct.includes(element)
      
      );
      if (found) {
        exist = true;
        data = this.customer + " - " + "can’t order " + this.order + " allergic to: " + this.customerAllergieProduct.join();
        console.log(data)
         return data
      }
      exist = false;
       data = "seccess";
       console.log(data)
       return data
    }
//   }
}