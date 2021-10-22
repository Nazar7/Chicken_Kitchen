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
  getRestaurantBudget,
} = require("./helpers/index.js");


// Julie Mirage, Fish in water



fs.readFile("./data/InputData.txt", "utf8", async function (err, data) {

  var ordersList = data.split(/\r\n/);

  let restaurantBudget = getRestaurantBudget(data).split(": ")[1]
  var resultData = [];
  resultData.push(getRestaurantBudget(data))

  let parsOrders = [];
  for (let i = 1; i < ordersList.length; i++) {
    let [action, name, order] = ordersList[i].split(", ");
    if (action === "Buy" && name !== "" && order !== "") {
      parsOrders.push({ name, order });
    }
  }

  
  for (let i = 0; i < parsOrders.length; i++) {
    var capitalize = getCapitalize(parsOrders[i].order);
    var orderr = capitalize;
    console.log(orderr);
    var customer = parsOrders[i].name
    var customerName = parsOrders[i].name.split(' ')[0];
    var customerLastName = parsOrders[i].name.split(' ')[1];
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

    var restOfCustomerBudget =
      getCustomerBudget(customer, customersBudgets) -
      getOrderPrice(orderIngridients, baseIngredientsPrices) * 1.3;

    const orderPrice = () =>{
      if(checkAllergiExist(orderIngridients, capitalize, customerAllergieProduct, customer) !== 'seccess'){
          return "XXX"
      } else {
        return getOrderPrice(orderIngridients, baseIngredientsPrices)
      }
    }

    let resultOfOrder = ordersList[i+1] + " -> " + customerName + ", " + getCustomerBudget(customer, customersBudgets) + ", " + orderr + ", " +
    orderPrice() +  " -> " + checkAllergiExist(orderIngridients, capitalize, customerAllergieProduct, customer)
    
    const getRestaurantProfit = () =>{
    if(checkAllergiExist(orderIngridients, capitalize, customerAllergieProduct, customer) == 'seccess') {
      restaurantBudget = parseInt(restaurantBudget) +  parseInt(getOrderPrice(orderIngridients, baseIngredientsPrices) * 1.3)
    }
    return restaurantBudget
  }

  var newBudget = getRestaurantProfit()
   
    if (restOfCustomerBudget > 0) resultData.push(resultOfOrder);

  } 

  resultData.push("Restaurant budget: " + newBudget)

  
  fs.writeFile("./data/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
});
