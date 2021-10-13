const readline = require("readline");

const { getDataFromFile } = require("./services/index.js");
const { getCustomerAllergieProduct, getFoodIngredients, getCapitalize, getBaseIngredientsPrices, getCustomerBudget} = require("./helpers/index.js");



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Write who buys what? ", async function (answer) {
  const [customer, order] = answer.split(", ");

  const capitalize = getCapitalize(order);

  const customerAllergieProduct = getCustomerAllergieProduct(await getDataFromFile("./data/RegularCustomersAllergies.csv"), customer);

  const baseIngredientListt = await getDataFromFile("./data/BaseIngredientList.csv")
    .then((data) => {
    return data[0].ingredients.split(",");
  });

  const foodIngredientsListt = getFoodIngredients(await getDataFromFile("./data/FoodIngredients.csv"), customer);

  const baseIngredientsPrices = getBaseIngredientsPrices(await getDataFromFile("./data/BaseIngridientsPrice.csv"));

  const customerBudget = getCustomerBudget(await getDataFromFile("./data/RegularCustomerBudget.csv"));

// console.log(customerBudget)
// console.log(baseIngredientsPrices)


  const getBaseIngridientsOfOrder = (order) => {
    let parsFood = foodIngredientsListt;
    return parsFood[order]
      .map((item) => {
        if (baseIngredientListt.includes(item)) {
          return item;
        }
        return getBaseIngridientsOfOrder(item);
      })
      .join("" + ", ");
  };
  const orderIngridients = getBaseIngridientsOfOrder(capitalize).split(", ");
  // console.log(orderIngridients)
  arrayOfOrderIngridients = orderIngridients.filter(function (item, pos) {
    return orderIngridients.indexOf(item) == pos;
  });
  // console.log(arrayOfOrderIngridients)

  const checkAlergiExist = (result, capitalize, customerAllergieProduct) => {
    for (i = 0; i <= customerAllergieProduct.length; i++) {
      if (result.indexOf(customerAllergieProduct[i]) !== -1) {
        console.log(customer + " - " + capitalize + ": " + "can’t order, allergic to: " + customerAllergieProduct
        );
        break;
      } else {
        console.log(customer + " - " + capitalize + ": " + "succes");
        // console.log(customerAllergieProduct)
        break;
      }
    }
  };

  checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct);

  const getOrderPrice = (orderIngridients, baseIngredientsPrices) =>{
    // console.log(orderIngridients)
    let totalOrderPrice = null;
      for (let i = 0;  i < orderIngridients.length; i++){
        for (const [key, value] of Object.entries(baseIngredientsPrices)) {
            if(key === orderIngridients[i]){
              totalOrderPrice += parseInt(value)
            }
          // console.log(`${key}`);
          // console.log(`${value}`);
        }
      }
      console.log(totalOrderPrice + " - total price of food")
      return totalOrderPrice;
  }
  // getOrderPrice(orderIngridients, baseIngredientsPrices)


  const getBudget = (customer, customerBudget) =>{
    let totalBudget = null;
        for (const [key, value] of Object.entries(customerBudget)) {
            if(key === customer){
              totalBudget = parseInt(value)
            }
        }
      console.log(totalBudget + " - budget of client")
      return totalBudget;
  }
  // getBudget(customer, customerBudget)

  // const budget = getBudget(customer, customerBudget);

  // const orderPrice = getOrderPrice(orderIngridients, baseIngredientsPrices)

const restOfBudget = getBudget(customer, customerBudget) - getOrderPrice(orderIngridients, baseIngredientsPrices)
console.log(restOfBudget + " - rest of budget")


rl.question("Maybe you wont to order more food? ", async function (answer) {

})

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

  // rl.close();
});
