const csv = require("csv-parser");
const fs = require("fs");
const foodPrice = [];
const parsPrice = {};
const arrNames = ["customersAllergies","baseIngredientList", "foodIngredients", "foodPrices"];
const inputData = {
    "BaseIngredientList" : [],
    "BaseIngridientsPrice" : [],
    "FoodIngredients": [],
    "RegularCustomersAllergies": []
};
const dir = './inputFiles';



const readDir = (callback) => {
    fs.readdir("/inputFiles", (err, files) => {
        callback(files)
      });
     
}

const parseCsv = () => {
   readDir( (files)=> {
       console.log(files)
        for(let i=0; i< files.length; i++){
            fs.createReadStream(files[i])
    .pipe(csv())
    .on("data", (data) => {
        const trimmedFileName = files[i].split('.')[0];
        inputData[trimmedFileName].push(data)})
    .on("end", () => {
        console.log(inputData)

    //   let obj = foodPrice.find((o) => o.name === customer);
    //   var customerAllergieProduct = obj.product.split(", ");

      for (element in foodPrice) {
        parsPrice[foodPrice[element].ingredients] =
        foodPrice[element].price;
      }
      console.log(parsPrice)

    })
        }
    })
    // console.log(files)
}

parseCsv()

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