class CustomersDatas {

  getCustomerAllergieProduct(data, customer) {
    if (customer !== "")
      return data.find(({ customer }) => customer === customer).product.split(", ");
  }

  getCustomersBudgets(data) {
      console.log(data)
    let parsBudget = {};
    for (element in data) {
      parsBudget[data[element].customer] = data[element].budget.split(", ");
    }
    return parsBudget;
  }

  getParseCustomersAllergiesProducts(customerAllergieProducts) {
    let customersAllergies = {};
    customerAllergieProducts.forEach((element, index) => {
      customersAllergies[customerAllergieProducts[index].name] =
        customerAllergieProducts[index].product;
    });
    return customersAllergies;
  }

  checkAllergiExist(orderIngridients, customersAllergiesList, customer, order) {
      console.log(orderIngridients)
    let data = "";
    let exist = false;
    if (customer in customersAllergiesList) {
      let customerAllergieProduct =
        customersAllergiesList[customer].split(", ");
      const found = orderIngridients.some((r) =>
        customerAllergieProduct.includes(r)
      );
      if (found) {
        exist = true;
        return (data = customer + " - " + "can’t order " + order + " allergic to: " + customerAllergieProduct.join());
      }
      exist = false;
      return (data = "seccess");
    }
  }
}

const getCustomersDatas = new CustomersDatas();

module.exports = getCustomersDatas;
