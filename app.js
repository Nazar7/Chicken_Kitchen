const readline = require("readline");

const { getDataFromFile } = require("./services/index.js");
const {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomerBudget,
  checkAlergiExist,
  getOrderPrice,
  getBudget,
  getBaseIngridientsOfOrder,
} = require("./helpers/index.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



rl.question("Write who buys what? ", async function (answer) {
  const [customer, order] = answer.split(", ");

  var capitalize = getCapitalize(order);

  var orderr = capitalize;

  const customerAllergieProduct = getCustomerAllergieProduct(
    await getDataFromFile("./data/RegularCustomersAllergies.csv"),
    customer
  );

  const baseIngredientListt = await getDataFromFile(
    "./data/BaseIngredientList.csv"
  ).then((data) => {
    return data[0].ingredients.split(",");
  });

  const foodIngredientsListt = getFoodIngredients(
    await getDataFromFile("./data/FoodIngredients.csv"),
    customer
  );

  const baseIngredientsPrices = getBaseIngredientsPrices(
    await getDataFromFile("./data/BaseIngridientsPrice.csv")
  );

  const customerBudget = getCustomerBudget(
    await getDataFromFile("./data/RegularCustomerBudget.csv")
  );

  const orderIngridients = getBaseIngridientsOfOrder(orderr, foodIngredientsListt, baseIngredientListt).split(", ");
  // console.log(orderIngridients)
  arrayOfOrderIngridients = orderIngridients.filter(function (item, pos) {
    return orderIngridients.indexOf(item) == pos;
  });

  checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer);


  var restOfBudget =
    getBudget(customer, customerBudget) -
    getOrderPrice(orderIngridients, baseIngredientsPrices);
  console.log(restOfBudget + " - rest of budget");

  function getMoreFood(restOfBudget) {
    rl.question("Would you like to order something else? ", async function (line) {
      if (line == "no") {
        rl.close();
      } else {
        capitalize = getCapitalize(line);
        orderr = capitalize;
        console.log(orderr);
        checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer);
        var price = getOrderPrice(orderIngridients, baseIngredientsPrices)
        restOfBudget = restOfBudget - price;
        console.log(restOfBudget)
        if (restOfBudget >= 0) {
          getMoreFood(restOfBudget);
        } else {
          console.log(customer + " – can’t order, budget " +  (restOfBudget + price) + " and " + orderr + " costs " +  price + " .")
          rl.close()
        }
      }
    });
  }
  getMoreFood(restOfBudget);
});

// Julie Mirage, Fish in water
