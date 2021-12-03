const Customer = require("../dataHandlers/customer.js");

module.exports = class Discount {
    constructor(){
        this.counter = 0;
        this.customerList = {};

    }

    discountCounter(customer){
        this.counter += 1
        this.customerList[customer] = this.counter
        if(this.customerList[customer] == 3) {

            return true
        }
        return false
    }
}

