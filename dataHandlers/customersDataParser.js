module.exports = class CustomerDataParse {
    constructor(data) {
        this.customersAllergiesList = data.customerAllergieProducts;
        this.customersBudgetsList = data.customersBudgets;
      }

      parsedCustomersAllergiesProducts() {
        let customersAllergies = {};
        this.customersAllergiesList.forEach((element, index) => {
          customersAllergies[this.customersAllergiesList[index].name] =
            this.customersAllergiesList[index].product;
        });
        return customersAllergies;
      }

      parsedCustomersBudgets() {
      let parsBudget = {};
      for (let element in this.customersBudgetsList) {
        parsBudget[this.customersBudgetsList[element].customer] = this.customersBudgetsList[element].budget.split(", ");
      }
      return parsBudget;
    }

}