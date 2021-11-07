const getCustomerAllergieProduct = (data, customer) => { 
    if(customer !== "") return data.find(({customer}) => customer === customer).product.split(", ");
  };

  
  // const getParsedCustomersBudgets = async () =>{
  //  const customersBudgets = await getCustomersBudgetsList()
  //   let parseData = {};
  //   // console.log(customersBudgets[0][customer])
  //   // console.log(customersBudgets[0].customer)
  //   // console.log(customersBudgets[0].budget)
  //   // for (let i = 0; i <= customersBudgets.length-1; i++){
  //   //   parseData[customersBudgets[i].customer] = customersBudgets[i].budget
  //   // }
  //     return customersBudgets
  //   }

  

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

  const getParseCustomersAllergiesProducts = (customerAllergieProducts) =>{
        let customersAllergies = {}
        customerAllergieProducts.forEach((element, index) => {
          customersAllergies[customerAllergieProducts[index].name] = customerAllergieProducts[index].product
        })
        return customersAllergies

    
  }

  const checkAllergiExist = (orderIngridients, customersAllergiesList, customer, order) => {
    let data = ''
    let exist = false;
    if(customer in customersAllergiesList){
      let customerAllergieProduct = customersAllergiesList[customer].split(", ")
      const found = orderIngridients.some(r=> customerAllergieProduct.includes(r))
        if (found){
          exist = true;
          return data = customer + " - " + "can’t order " + order + " allergic to: " + customerAllergieProduct.join();
        }
        exist = false;
         return data = "seccess"
    };
  
    
      // if (result.indexOf(customerAllergieProducts[i]) !== -1) {
      //   exist = true;
      //   // data = customer + " - " + capitalize + ": " + "can’t order, allergic to: " + customerAllergieProduct;
      //   data = "can’t buy, allergic to " + customerAllergieProducts;
      //   if(exist) return data;
        
      // } else {
      //   exist = false;
      //   // data = customer + " - " + capitalize + ": " + "success";
      //   data = "seccess"
      //   if(!exist) return data    
      // }
    
  };

  module.exports = {
    getCustomerAllergieProduct,
    getCustomersBudgets,
    getCustomerBudget,
    checkAllergiExist,
    getParseCustomersAllergiesProducts,
    // getParsedCustomersBudgets
  };