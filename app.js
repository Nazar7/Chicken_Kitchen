const readline = require("readline");
const fs = require("fs");

const { getDataFromFile } = require("./services/index.js");
const { getDataFromFileTxt } = require("./services/indexTXT")

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

// const {
//   customerAllergieProductt,
// } = require("./services/repository")


// Julie Mirage, Fish in water

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });


// rl.question("Write who buys what? ", async function (answer) {
  fs.readFile("./data/OrderFile.txt", 'utf8', async function (err, data) {

    var ordersList = data.split(/\r\n/);
    let parsOrders = [];
    for (let i = 0; i < ordersList.length; i++ ){
      let [action, name, order] = ordersList[i].split(', ');
      if (action === 'Buy' && parsOrders.length == 3) {
      parsOrders.push({ name, order });
      }
      }
      console.log(parsOrders)

  // const [customer, order] = answer.split(", ");

  for (let i = 0; i < parsOrders.length; i++){

  var capitalize = getCapitalize(parsOrders[i].order);

  var orderr = capitalize;
console.log(orderr)
  var customer = parsOrders[i].name
  console.log(customer)


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

  const customerBudget = getCustomerBudget(
    await getDataFromFile("./data/RegularCustomerBudget.csv")
  );

  // console.log(customerBudget)

  const orderIngridients = getBaseIngridientsOfOrder(orderr, foodIngredientsListt, baseIngredientListt).split(", ");
  arrayOfOrderIngridients = orderIngridients.filter(function (item, pos) {
    return orderIngridients.indexOf(item) == pos;
  });

  // console.log(orderIngridients)
  

  checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer);

  // const result = checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer);
  // console.log(result)


  var restOfBudget =
    getBudget(customer, customerBudget) -
    getOrderPrice(orderIngridients, baseIngredientsPrices);
  console.log(restOfBudget + " - rest of budget");

  // function getMoreFood(restOfBudget) {
  //   rl.question("Would you like to order something else? ", async function (line) {
  //     if (line == "no") {
  //       rl.close();
  //     } else {
  //       capitalize = getCapitalize(line);
  //       orderr = capitalize;
  //       checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer);
  //       var price = getOrderPrice(orderIngridients, baseIngredientsPrices)
  //       restOfBudget = restOfBudget - price;
  //       if (restOfBudget >= 0) {
  //         getMoreFood(restOfBudget);
  //       } else {
  //         console.log(customer + " – can’t order, budget " +  (restOfBudget + price) + " and " + orderr + " costs " +  price + " .")
  //         rl.close()
  //       }
  //     }
  //   });
  // }
  // getMoreFood(restOfBudget);
}
var stream = fs.createWriteStream("./data/OrderResultFile.txt");
stream.once('open', function(result) {
  stream.write(checkAlergiExist(orderIngridients, capitalize, customerAllergieProduct, customer));
  stream.end();
});

});



