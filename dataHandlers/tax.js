const Customer = require("../dataHandlers/customer.js");

module.exports = class Tax {
  constructor(everyThirdDiscount, transactionTax, dishPriceForCustomer) {
    this.transactionTax = transactionTax;
    this.everyThirdDiscount = everyThirdDiscount;
    this.dishPriceForCustomer = dishPriceForCustomer;
    this.restaurantTransactionTax = 0;
    this.restaurantDiscoumt = 0;
  }
  getTaxAndDiscountObjact() {

    if (
      !this.everyThirdDiscount &&
      !this.restaurantTransactionTax
    ) {
        this.restaurantTransactionTax = 0.1;
        this.restaurantDiscoumt = 0.1;
      // return restaurantTransactionTax = 0.1
    } else {
        this.restaurantTransactionTax = parseFloat((this.dishPriceForCustomer *
            (this.transactionTax / 100)).toFixed(2));
        this.restaurantDiscoumt =
            parseFloat((
                this.dishPriceForCustomer *
                (this.everyThirdDiscount / 100)
            ).toFixed(2)

        );

    }
      return { restaurantDiscoumt: this.restaurantDiscoumt, restaurantTransactionTax: this.restaurantTransactionTax}

  }

};