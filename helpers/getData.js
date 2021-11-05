const { getDataFromFile } = require("../services/index.js");

const getWarehouseList = async () => (
  await getDataFromFile("./data/Warehouse.txt")
);

const getFoodIngredientsList = async () => (
    await getDataFromFile("./data/FoodIngredients.csv")
  );


  const getBaseIngredientsList = async () => await getDataFromFile(
    "./data/BaseIngredientList.csv"
  ).then((data) => {
    return data[0].ingredients.split(",");
  });


  const getCustomerAllergieProductsList = async () => (
    await getDataFromFile("./data/RegularCustomersAllergies.csv")
    )
  


  const getBaseIngredientsPricesList = async () =>  (
    await getDataFromFile("./data/BaseIngridientsPrice.csv")
  );


  const getCustomersBudgetsList =  async () =>  (
    await getDataFromFile("./data/RegularCustomerBudget.csv")
  );


  module.exports = {
    getBaseIngredientsList,
    getFoodIngredientsList,
    getCustomerAllergieProductsList,
    getBaseIngredientsPricesList,
    getCustomersBudgetsList,
    getWarehouseList,
  }