const resultHandleDatas = require("../dataHandlers/handleIAllDatasFromFiles.js");
const InputDataParse = require("../dataHandlers/inputDataParser.js");
const IngridientsPricesDataParse = require("../dataHandlers/ingridientsPricesParser.js");
const WarehouseDataParse = require("../dataHandlers/warehousDataParser.js");
const DishDataParse = require("../dataHandlers/dishDataParser.js");
const CustomerDataParse = require("../dataHandlers/customersDataParser.js");
const ActionClass = require("../helpers/actionClass");
const Dish = require("../dataHandlers/dish.js");
const Customer = require("../dataHandlers/customer.js");
const Allergie = require("../dataHandlers/allergie.js");
const WarehousCalculation = require("../dataHandlers/warehousCalculation.js");
jest.setTimeout(800000);

test("Check processAllergiesWarehouse " +
	"- return correct message if we set warehouse config to 'waste'", async () => {

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
	//can be configurated
	let WAREHOUSE_CONFIG = JSON.parse(datasFromFiles.warehouseConfig)
	let ALLERGIES_WAREHOUSE_CONFIG = JSON.parse(datasFromFiles.allergiesWarehouseConfig);
	WAREHOUSE_CONFIG.total_maximum = 500;
	ALLERGIES_WAREHOUSE_CONFIG.dishes_with_allergies = 'waste';
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


	//TEST DATA HERE
	const dish = 'Chocolate';

	const Dish = require("../dataHandlers/dish.js");
	const Customer = require("../dataHandlers/customer.js");
	const Allergie = require("../dataHandlers/allergie.js");
	let dishObject = new Dish(
		//Chocolate
		dish,
		ACTIONS.baseIngridients,
		ACTIONS.parsedDishData,
		ACTIONS.parsedIngridientsPricesData
	);
	let customerObject = new Customer(ACTIONS.ParsedCustomerData, customer);
	let customerBudget = customerObject.loadCustomerBudget(ACTIONS.actualCustomerBudget)
	let allergieObjact = new Allergie(dish, customer, dishObject.getBaseIngridientsOfDish(), customerObject.loadCustomerAllergieProduct());
// let warehousObjact = new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish());


	expect(allergieObjact.processAllergiesWarehouse(
		false,
		dishObject,
		ACTIONS.warehouseStock,
		new WarehousCalculation(dish,dishObject.getBaseIngridientsOfDish()),
		ACTIONS.restaurantBudget,
		'')).toStrictEqual("; Wasted due to configuration!");
});


