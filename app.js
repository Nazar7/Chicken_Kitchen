const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const customersAllergiesList = [];
const baseIngredientList = [];
const foodIngredients = [];
const parsFood = {};
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Write who buys what? ", function (answer) {
  var customer = answer.split(", ")[0];
  var order = answer.split(", ")[1];

  function capitalize(order) {
    return order.charAt(0).toUpperCase() + order.slice(1);
  }
  
  const capitalizeFoodName = order.split(" ").map(capitalize).join(" ");

  fs.createReadStream("RegularCustomersAllergies.csv")
    .pipe(csv())
    .on("data", (data) => customersAllergiesList.push(data))
    .on("end", () => {
      const customerAndAlergi = customersAllergiesList.find((o) => o.name === customer);
      // console.log(customerAndAlergi)
      const customerAllergieProduct = customerAndAlergi.product.split(", ");
      fs.createReadStream("BaseIngredientList.csv")
        .pipe(csv())
        .on("data", (data) => baseIngredientList.push(data))
        .on("end", () => {
          function capitalize(order) {
            return order.charAt(0).toUpperCase() + order.slice(1);
          }
          const capitalizeFoodName = order.split(" ").map(capitalize).join(" ");
          const baseIngredients = baseIngredientList[0].ingredients.split(",");

          fs.createReadStream("FoodIngredients.csv")
            .pipe(csv())
            .on("data", (data) => foodIngredients.push(data))
            .on("end", () => {
              for (element in foodIngredients) {
                parsFood[foodIngredients[element].food] =
                  foodIngredients[element].ingredients.split(", ");
              }
              const getBaseIngridients = (order) => {
                return parsFood[order]
                  .map((item) => {
                    if (baseIngredients.includes(item)) {
                      return item;
                    }
                    return getBaseIngridients(item);
                  })
                  .join("" + ", ");
              };
              
              const baseIngridients = getBaseIngridients(capitalizeFoodName).split(", ")
              const baseIngridientsList = baseIngridients.filter(function (item, pos) {
                return baseIngridients.indexOf(item) == pos;
              });
              // console.log(baseIngridientsList);
              const checkAlergiExist = (baseIngridients, capitalizeFoodName, customerAllergieProduct) => {
                for (i = 0; i <= customerAllergieProduct.length; i++) {
                  if (baseIngridients.indexOf(customerAllergieProduct[i]) !== -1) {
                    console.log(customer +  " - " + capitalizeFoodName + ": " + "can’t order, allergic to: " + customerAllergieProduct);
                    break;
                  } else {
                    console.log(customer + " - " + capitalizeFoodName + ": " + "succes");
                    break;
                  }
                }
              };
              checkAlergiExist(baseIngridients, capitalizeFoodName, customerAllergieProduct);
            });
        });
    });
  rl.close();
});
