const readline = require("readline");
const fs = require("fs");

const { getDataFromFile } = require("./services/index.js");

const {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomersBudgets,
  checkAlergiExist,
  getOrderPrice,
  getBudget,
  getBaseIngridientsOfOrder,
} = require("./helpers/index.js");


// Julie Mirage, Fish in water

fs.readFile("./data/OrderFile.txt", "utf8", async function (err, data) {
  console.log(data);

  var ordersList = data.split(/\r\n/);
  console.log(ordersList);
  let parsOrders = [];
  for (let i = 0; i < ordersList.length; i++) {
    let [action, name, order] = ordersList[i].split(", ");
    if (action === "Buy" && name !== "" && order !== "") {
      parsOrders.push({ name, order });
    }
  }

  // const [customer, order] = answer.split(", ");
  var resultData = [];
  for (let i = 0; i < parsOrders.length; i++) {
    var capitalize = getCapitalize(parsOrders[i].order);
    var orderr = capitalize;
    console.log(orderr);
    var customer = parsOrders[i].name;
    console.log(customer);

    const customerAllergieProduct = getCustomerAllergieProduct(
      await getDataFromFile("./data/RegularCustomersAllergies.csv"),
      customer
    );

    // console.log(customerAllergieProduct)

    const baseIngredientListt = await getDataFromFile(
      "./data/BaseIngredientList.csv"
    ).then((data) => {
      return data[0].ingredients.split(",");
    });

    // console.log(baseIngredientListt)

    const foodIngredientsListt = getFoodIngredients(
      await getDataFromFile("./data/FoodIngredients.csv"),
      customer
    );

    // console.log(foodIngredientsListt)

    const baseIngredientsPrices = getBaseIngredientsPrices(
      await getDataFromFile("./data/BaseIngridientsPrice.csv")
    );

    // console.log(baseIngredientsPrices)

    const customersBudgets = getCustomersBudgets(
      await getDataFromFile("./data/RegularCustomerBudget.csv")
    );

    // console.log(customerBudget)

    const orderIngridients = getBaseIngridientsOfOrder(
      orderr,
      foodIngredientsListt,
      baseIngredientListt
    ).split(", ");
    arrayOfOrderIngridients = orderIngridients.filter(function (item, pos) {
      return orderIngridients.indexOf(item) == pos;
    });

    // console.log(orderIngridients)

    checkAlergiExist(
      orderIngridients,
      capitalize,
      customerAllergieProduct,
      customer
    );

    var restOfBudget =
      getBudget(customer, customersBudgets) -
      getOrderPrice(orderIngridients, baseIngredientsPrices);
    console.log(restOfBudget + " - rest of budget");

    resultData.push(ordersList[i] + " -> " + customer.split(" ")[0] + ", " + getBudget(customer, customersBudgets) + ", " + orderr + ", " +
         getOrderPrice(orderIngridients, baseIngredientsPrices) +  " -> " + checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer));
  }
  console.log(resultData.join("\n"));
  fs.writeFile("./data/OrderResultFile.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
});
