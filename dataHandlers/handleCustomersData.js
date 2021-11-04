const getCustomerAllergieProduct = (data, customer) => { 
    if(customer !== "") return data.find((o) => o.name === customer).product.split(", ");
  };

  const getCustomersBudgets = (data) => {
    let parsBudget = {};
  for (element in data) {
    parsBudget[data[element].customer] =
    data[element].budget.split(", ");
  }
  return parsBudget;
  };

  const getCustomerBudget = (customer, customerBudget) =>{
    let totalBudget = null;
        for (const [key, value] of Object.entries(customerBudget)) {
            if(key === customer){
              totalBudget = parseInt(value)
            }
        }
      return totalBudget;
  }

  module.exports = {
    getCustomerAllergieProduct,
    getCustomersBudgets,
    getCustomerBudget,
  };