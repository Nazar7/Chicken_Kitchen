const getRestaurantBudget = (data) => {
  return data.split(`\n`)[0]
  };

// const checkAllergiExist = (result, capitalize, customerAllergieProduct, customer) => {
//   let data = ''
//   let exist = false;
//   for (i = 0; i <= customerAllergieProduct.length; i++) {
//     if (result.indexOf(customerAllergieProduct[i]) !== -1) {
//       exist = true;
//       // data = customer + " - " + capitalize + ": " + "can’t order, allergic to: " + customerAllergieProduct;
//       data = "can’t buy, allergic to " + customerAllergieProduct;
//       if(exist) return data;
      
//     } else {
//       exist = false;
//       // data = customer + " - " + capitalize + ": " + "success";
//       data = "seccess"
//       if(!exist) return data    
//     }
//   }
// };

module.exports = {
  checkAllergiExist,
  getRestaurantBudget,
};
