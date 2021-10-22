const readline = require("readline");
const fs = require("fs");

const { getDataFromFile } = require("./services/index.js");

const {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
  getBaseIngredientsPrices,
  getCustomersBudgets,
  checkAllergiExist,
  getOrderPrice,
  getCustomerBudget,
  getBaseIngridientsOfOrder,
} = require("./helpers/index.js");

// Julie Mirage, Fish in water

fs.readFile("./data/InputData.txt", "utf8", async function (err, data) {
  var ordersList = data.split(/\r\n/);

  var resultData = [];

  let parsBuyers = [];
  let parsBudget = [];
  let parsOrder = [];
  for (let i = 0; i < ordersList.length; i++) {
    let [action, arg, val] = ordersList[i].split(", ");
    if (action === "Buy" && arg !== "" && val !== "") {
      parsBuyers.push({ action, arg, val });
    } else if (action === "Budget") {
      parsBudget.push({ action, arg, val });
    } else if (action === "Order") {
      parsOrder.push({ action, arg, val });
    }
  }

  var order = parsOrder[0].arg
  var quantity = parsOrder[0].val
  console.log(order)
  console.log(quantity)
  let restaurantBudget = parsBudget[0].val;
  // console.log(restaurantBudget)
  resultData.push("Restaurant budget: " + restaurantBudget);

  for (let i = 0; i < parsBuyers.length; i++) {
    var capitalize = getCapitalize(parsBuyers[i].val);
    var orderr = capitalize;
    console.log(orderr);
    var customer = parsBuyers[i].arg;
    var customerName = parsBuyers[i].arg.split(" ")[0];
    var customerLastName = parsBuyers[i].arg.split(" ")[1];
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

    console.log(baseIngredientsPrices)

    const customersBudgets = getCustomersBudgets(
      await getDataFromFile("./data/RegularCustomerBudget.csv")
    );

    // console.log(customerBudget)

    const orderIngridients = getBaseIngridientsOfOrder(
      orderr,
      foodIngredientsListt,
      baseIngredientListt
    ).split(", ");

    ingridientsOfOrder = orderIngridients.filter(function (item, pos) {
      return orderIngridients.indexOf(item) == pos;
    });

    var restOfCustomerBudget =
      getCustomerBudget(customer, customersBudgets) -
      getOrderPrice(orderIngridients, baseIngredientsPrices) * 1.3;

    const alergiExist = checkAllergiExist(
      orderIngridients,
      capitalize,
      customerAllergieProduct,
      customer
    );

    const customerBudget = getCustomerBudget(customer, customersBudgets);

    const orderPrice = parseInt(
      getOrderPrice(orderIngridients, baseIngredientsPrices)
    );

    const res = () => {
      if (customerBudget > orderPrice) {
        var resultOfOrder = ordersList[i + 1] + " -> " + customerName + ", " + customerBudget + ", " + orderr + ", " + orderPrice + " -> " + alergiExist;
        return resultData.push(resultOfOrder);
      } else if (customerBudget < orderPrice) {
        var resultOfOrder = ordersList[i + 1] + " -> " + customerName + ", " + customerBudget + ", " + orderr + ", " + "XXX" + " -> " + "NOT INAF MONEY";
        return resultData.push(resultOfOrder);
      }
      return;
    };

    res();

    var getRestaurantProfit = () => {
      console.log(customerBudget)
      console.log(orderPrice)
      console.log(restaurantBudget)
      if (alergiExist == "seccess" && customerBudget > orderPrice) {
        return (restaurantBudget = parseInt(restaurantBudget) + orderPrice * 1.3 );
      } else {
        return (restaurantBudget = parseInt(restaurantBudget))
      }
    };
    var newBudget = getRestaurantProfit();
  }

  resultData.push("Restaurant budget: " + newBudget);

  fs.writeFile("./data/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
});
