const resultHandleDatas = require("../dataHandlers/handleIAllDatasFromFiles.js");
const InputDataParse = require("../dataHandlers/inputDataParser.js");
const IngridientsPricesDataParse = require("../dataHandlers/ingridientsPricesParser.js");
const WarehouseDataParse = require("../dataHandlers/warehousDataParser.js");
const DishDataParse = require("../dataHandlers/dishDataParser.js");
const CustomerDataParse = require("../dataHandlers/customersDataParser.js");
const ActionClass = require("../helpers/actionClass");
jest.setTimeout(800000);
test("Check checkWarehouseConfig " +
	"- return correct message if total warehouse limit is partially reached", async () => {

	const ActionClass = require("../helpers/actionClass");
	const resultHandleDatas = require("../dataHandlers/handleIAllDatasFromFiles.js");
	const InputDataParse = require("../dataHandlers/inputDataParser.js");
	const IngridientsPricesDataParse = require("../dataHandlers/ingridientsPricesParser.js");
	const WarehouseDataParse = require("../dataHandlers/warehousDataParser.js");
	const DishDataParse = require("../dataHandlers/dishDataParser.js");
	const CustomerDataParse = require("../dataHandlers/customersDataParser.js");

	const datasFromFiles = await resultHandleDatas();

	// TEST DATA HERE:
	datasFromFiles.warehousData = "Princess Chicken, 1, Chicken, 5, Tuna, 5, Potatoes, 5, Asparagus, 5, Milk, 5, Honey, 5, Paprika, 5, Garlic, 5, Water, 5, Lemon, 5, Tomatoes, 5, Pickles, 5, Feta, 5, Vinegar, 5, Rice, 5, Chocolate, 5";


	const BASE_INGREDIENTS_LIST = datasFromFiles.baseIngredients
	const PROFIT_TAX_LIST = JSON.parse(datasFromFiles.profitAndTaxList)
//Enzelt
	const WAREHOUSE_CONFIG = JSON.parse(datasFromFiles.warehouseConfig)
	const ALLERGIES_WAREHOUSE_CONFIG = JSON.parse(datasFromFiles.allergiesWarehouseConfig);
//******

	let restaurantBudget = 500;
	var resultData = [];
	resultData.push("Restaurant budget: " + restaurantBudget);
	let newRestaurantBudget = restaurantBudget;
	let auditList = []
	let auditResult = []

	let customer = "";
	let order = "";
	const ParsedInputData = new InputDataParse(datasFromFiles);
	const ParsedIngridientsPricesData = new IngridientsPricesDataParse(datasFromFiles)
	const ParsedWarehouseData = new WarehouseDataParse(datasFromFiles);
	const ParsedDishData = new DishDataParse(datasFromFiles)
	const ParsedCustomerData = new CustomerDataParse(datasFromFiles)
	let dataList = ParsedInputData.parsedInputData()
	let warehouseStock = ParsedWarehouseData.parsedWarehousData()

	const ACTIONS = new ActionClass(
		BASE_INGREDIENTS_LIST,
		ParsedIngridientsPricesData,
		ParsedDishData,
		ParsedCustomerData,
		PROFIT_TAX_LIST,
		restaurantBudget,
		warehouseStock,
		//Enzelt
		WAREHOUSE_CONFIG,
		ALLERGIES_WAREHOUSE_CONFIG
		//******
	)

	expect(ACTIONS.checkWarehouseConfig('Chocolate', 502)).toStrictEqual(
		{"canOrder": 5, "message": "Limit of ingredient/dish reached partially" + "\r\n", "wasted": 497});
});

test("Check checkWarehouseConfig " +
	"- return correct message if total warehouse limit is totally reached", async () => {

	const ActionClass = require("../helpers/actionClass");
	const resultHandleDatas = require("../dataHandlers/handleIAllDatasFromFiles.js");
	const InputDataParse = require("../dataHandlers/inputDataParser.js");
	const IngridientsPricesDataParse = require("../dataHandlers/ingridientsPricesParser.js");
	const WarehouseDataParse = require("../dataHandlers/warehousDataParser.js");
	const DishDataParse = require("../dataHandlers/dishDataParser.js");
	const CustomerDataParse = require("../dataHandlers/customersDataParser.js");

	const datasFromFiles = await resultHandleDatas();

	// TEST DATA HERE:
	datasFromFiles.warehousData = "Princess Chicken, 1, Chicken, 5, Tuna, 5, Potatoes, 5, Asparagus, 5, Milk, 5, Honey, 5, Paprika, 5, Garlic, 5, Water, 5, Lemon, 5, Tomatoes, 5, Pickles, 5, Feta, 5, Vinegar, 5, Rice, 5, Chocolate, 10";



	const BASE_INGREDIENTS_LIST = datasFromFiles.baseIngredients
	const PROFIT_TAX_LIST = JSON.parse(datasFromFiles.profitAndTaxList)
//Enzelt
	const WAREHOUSE_CONFIG = JSON.parse(datasFromFiles.warehouseConfig)
	const ALLERGIES_WAREHOUSE_CONFIG = JSON.parse(datasFromFiles.allergiesWarehouseConfig);
//******

	let restaurantBudget = 500;
	var resultData = [];
	resultData.push("Restaurant budget: " + restaurantBudget);
	let newRestaurantBudget = restaurantBudget;
	let auditList = []
	let auditResult = []

	let customer = "";
	let order = "";
	const ParsedInputData = new InputDataParse(datasFromFiles);
	const ParsedIngridientsPricesData = new IngridientsPricesDataParse(datasFromFiles)
	const ParsedWarehouseData = new WarehouseDataParse(datasFromFiles);
	const ParsedDishData = new DishDataParse(datasFromFiles)
	const ParsedCustomerData = new CustomerDataParse(datasFromFiles)
	let dataList = ParsedInputData.parsedInputData()
	let warehouseStock = ParsedWarehouseData.parsedWarehousData()

	const ACTIONS = new ActionClass(
		BASE_INGREDIENTS_LIST,
		ParsedIngridientsPricesData,
		ParsedDishData,
		ParsedCustomerData,
		PROFIT_TAX_LIST,
		restaurantBudget,
		warehouseStock,
		//Enzelt
		WAREHOUSE_CONFIG,
		ALLERGIES_WAREHOUSE_CONFIG
		//******
	)

	expect(ACTIONS.checkWarehouseConfig('Chocolate', 502)).toStrictEqual(
		{"canOrder": 0, "message": "Total limit of ingredient/dish reached" + "\r\n", "wasted": 502});
});