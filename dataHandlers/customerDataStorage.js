
module.exports = class CustomerData{
    constructor(allergiList, budgetList, customer) {
        this.allergiesList = allergiList;
        this.budgetsList = budgetList
        this.customer = customer;
      }

    getCustomerAllergieProduct() {
        let customerProductAllergi = []
        if (this.customer in this.allergiesList && this.allergiesList[this.customer] !== ''){
             customerProductAllergi.push(this.allergiesList[this.customer])
             return customerProductAllergi.toString().split(", ")
        } else
         console.log(this.customer + " doesnt exist in list of CustomersAllergies or doesnt have allergi for any product")
         return customerProductAllergi
      }

      getCustomerBudget(){
          let customerBudget = ""
          if (this.customer in this.budgetsList && this.budgetsList[this.customer] !== ''){
            customerBudget = parseInt(this.budgetsList[this.customer])
            console.log(customerBudget)
            return customerBudget
       } else
       return console.log(this.customer + " doesnt have money at all")
     
      }

 
}