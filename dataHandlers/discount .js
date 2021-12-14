class Discount {
    constructor(){
        this.counter = 0;
        this.customerList = {};

    }

    discountCounter(customer){
        this.counter += 1
        this.customerList[customer] = this.counter
        if(this.customerList[customer]  % 3 === 0) {

            return true
        }
        return false
    }
}

const discount = new Discount();

module.exports = discount;
