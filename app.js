const csv = require("csv-parser");
const fs = require("fs");
const results = [];
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

  fs.createReadStream("RegularCustomersAllergies.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      let obj = results.find((o) => o.name === customer);
      var customerAllergieProduct = obj.product.split(", ");

      fs.createReadStream("BaseIngredientList.csv")
        .pipe(csv())
        .on("data", (data) => baseIngredientList.push(data))
        .on("end", () => {
          function capitalize(order) {
            return order.charAt(0).toUpperCase() + order.slice(1);
          }
          const capitalizeFoodName = order.split(" ").map(capitalize).join(" ");
          var baseIngredients = baseIngredientList[0].ingredients.split(",");

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
              const result = getBaseIngridients(capitalizeFoodName).split(", ");
              uniqueArray = result.filter(function (item, pos) {
                return result.indexOf(item) == pos;
              });
              console.log(uniqueArray);
              const checkAlergiExist = (result, capitalizeFoodName, customerAllergieProduct) => {
                for (i = 0; i <= customerAllergieProduct.length; i++) {
                  if (result.indexOf(customerAllergieProduct[i]) !== -1) {
                    console.log(customer +  " - " + capitalizeFoodName + ": " + "can’t order, allergic to: " + customerAllergieProduct);
                    break;
                  } else {
                    console.log(customer + " - " + capitalizeFoodName + ": " + "succes");
                    break;
                  }
                }
              };
              checkAlergiExist(result, capitalizeFoodName, customerAllergieProduct);
            });
        });
    });
  rl.close();
});


// fs.createReadStream("BaseIngridientsPrice.csv")
//     .pipe(csv())
//     .on("data", (data) => foodPrice.push(data))
//     .on("end", () => {

//     //   let obj = foodPrice.find((o) => o.name === customer);
//     //   var customerAllergieProduct = obj.product.split(", ");

//       for (element in foodPrice) {
//         parsPrice[foodPrice[element].ingredients] =
//         foodPrice[element].price;
//       }
//       console.log(parsPrice)

//     })