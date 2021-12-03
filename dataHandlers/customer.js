
module.exports = class Customer{
    constructor(customerData, customer) {
        this.allergiesList = customerData.parsedCustomersAllergiesProducts();
        this.budgetsList = customerData.parsedCustomersBudgets()
        this.customer = customer;
   
      }

    loadCustomerAllergieProduct() {
        let customerProductAllergi = []
        if (this.customer in this.allergiesList || this.allergiesList[this.customer] === ''){
          customerProductAllergi.push(this.allergiesList[this.customer])
          return customerProductAllergi.toString().split(", ")   
        } else
        console.log(this.customer + " doesnt exist in list of CustomersAllergies or doesnt have allergi for any product")
          return customerProductAllergi 
       
      }

      loadCustomerBudget(actualCustomerBudget){
          let customerBudget = ""

          if(actualCustomerBudget === 0){
              if (this.customer in this.budgetsList && this.budgetsList[this.customer] !== ''){
                  customerBudget = parseInt(this.budgetsList[this.customer])
                  return customerBudget
              }
          }
          else{

              return actualCustomerBudget
          }

       return console.log(this.customer + " doesnt have money at all")
     
      }

 
}