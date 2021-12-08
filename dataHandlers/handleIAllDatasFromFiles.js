const getData  = require("../services/getDataFromFile")
const getDataFromCsv  = require("../services/getDataFromCsvFile")
const getWarehousData = require('../dataHandlers/handleWarehousDataClass')
const getCustomersDatas = require("../dataHandlers/handleCustomersDataClass")

const resulted = async () => {

  //Enzelt
  const warehouseConfig = await getData.getDataFromFile("./data/warehouse.json");
  const allergiesWarehouseConfig = await getData.getDataFromFile("./data/allergiesWarehouse.json");
  //********
  const warehousData = await getData.getDataFromFile("./data/Warehouse.txt");
  const commandList = await getData.getDataFromFile("./data/command.json");

  const profitAndTaxList = await getData.getDataFromFile("./data/profitAndTaxFile.json");


  const inputData = await getData.getDataFromInputFile(
    "./input/inputData.txt"
  );

  const custommersAllergis = await getDataFromCsv.getDataFromFile(
    "/RegularCustomersAllergies.csv"
  );

  const foodIngredients = await getDataFromCsv.getDataFromFile(
    "/FoodIngredients.csv"
  );

  const baseIngredients = await getDataFromCsv.getDataFromFile(
    "/BaseIngredientList.csv"
  );

  const customerAllergieProducts = await getDataFromCsv.getDataFromFile(
    "/RegularCustomersAllergies.csv"
  );

  const ingredientsPrices = await getDataFromCsv.getDataFromFile(
    "/BaseIngridientsPrice.csv"
  );

  const customersBudgets =   await getDataFromCsv.getDataFromFile(
    "/RegularCustomerBudget.csv"
  );

  const parsedWarehouseStock =
    getWarehousData.getParsedWarehousData(warehousData);
  const parsedCustomersAllergiesProducts =
    getCustomersDatas.getParseCustomersAllergiesProducts(
      customerAllergieProducts
    );

  return (dataList = {
    warehousData,
    commandList,
    inputData,
    custommersAllergis,
    foodIngredients,
    baseIngredients,
    customerAllergieProducts,
    ingredientsPrices,
    customersBudgets,
    parsedWarehouseStock,
    parsedCustomersAllergiesProducts,
    profitAndTaxList,
    //Enzelt
    warehouseConfig,
    allergiesWarehouseConfig
    //*****
  });
};

module.exports = resulted;
