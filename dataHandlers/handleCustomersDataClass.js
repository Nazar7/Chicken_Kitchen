class CustomersDatas {
  getParseCustomersAllergiesProducts(customerAllergieProducts) {
    let customersAllergies = {};
    customerAllergieProducts.forEach((element, index) => {
      customersAllergies[customerAllergieProducts[index].name] =
        customerAllergieProducts[index].product;
    });
    return customersAllergies;
  }
}

const getCustomersDatas = new CustomersDatas();

module.exports = getCustomersDatas;
