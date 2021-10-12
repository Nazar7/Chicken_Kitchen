const readline = require("readline");

const { getDataFromFile } = require("./services/index.js");
const { getCustomerAllergieProduct } = require("./helpers/index.js");
const { getFoodIngredients } = require("./helpers/index.js");
const { getCapitalize } = require("./helpers/index.js");

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

  const getBaseIngridients = (order) => {
    let parsFood = foodIngredientsListt;
    return parsFood[order]
      .map((item) => {
        if (baseIngredientListt.includes(item)) {
          return item;
        }
        return getBaseIngridients(item);
      })
      .join("" + ", ");
  };
  const result = getBaseIngridients(capitalize).split(", ");
  // console.log(result)
  uniqueArray = result.filter(function (item, pos) {
    return result.indexOf(item) == pos;
  });
  // console.log(uniqueArray)

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
  checkAlergiExist(result, capitalize, customerAllergieProduct);
  rl.close();
});
