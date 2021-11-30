const fs = require("fs");

const resultHandleDatas = require('./dataHandlers/handleIAllDatasFromFiles.js');

const InputDataParse = require('./dataHandlers/inputDataParser.js')
const WarehouseDataParse = require('./dataHandlers/warehousDataParser.js')
const WarehousCalculation = require('./dataHandlers/warehousCalculation.js')
const IngridientsPricesDataParse = require('./dataHandlers/ingridientsPricesParser.js')
const DishDataParse = require('./dataHandlers/dishDataParser.js')
const CustomerDataParse = require('./dataHandlers/customersDataParser.js')
const Dish = require('./dataHandlers/dish.js')
const Customer = require('./dataHandlers/customer.js')
const Allergie = require('./dataHandlers/allergie.js')
const ActionBuy = require('./helpers/actionClass.js')



const getData  = require("./services/getDataFromFile")
const getDataFromCsv  = require("./services/getDataFromCsvFile")
const Action  = require("./helpers/actionClass")
const getOrderActions  = require("./helpers/actionClass")


const res =  async () => {
    const datasFromFiles = await resultHandleDatas()

    const BASE_INGREDIENTS_LIST = datasFromFiles.baseIngredients
    const PROFIT_TAX_LIST = JSON.parse(datasFromFiles.profitAndTaxList)


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

    const ACTIONS = new Action(
        BASE_INGREDIENTS_LIST,
        ParsedIngridientsPricesData,
        ParsedDishData,
        ParsedCustomerData,
        PROFIT_TAX_LIST,
        restaurantBudget,
        warehouseStock
    )
    let actionResultsObjact = []
    let resultAuditList = []

    for (let i = 0; i <= dataList.length - 1; i++) {
        switch (dataList[i].action) {
            case 'Buy' :
            case 'Table':
                let tableResult = ACTIONS.loadBuyAction(dataList[i])
                console.log(tableResult)
                actionResultsObjact.push(tableResult)
                break;
            case 'Order' :
                let resultData = ACTIONS.loadOrderAction(dataList[i])
                // console.log(orderResult)
                actionResultsObjact.push(resultData)

                // console.log(actionResultsObjact)
                break;
            case 'Budget' :
                let budgetResult = ACTIONS.loadBudgetAction(dataList[i])
                actionResultsObjact.push(budgetResult)
                break;
            case 'Audit' :
                let resultAudit = ACTIONS.loadAuditAction(dataList[i], actionResultsObjact)
                resultAuditList.push(resultAudit)
                console.log(resultAudit)
                break;
        }
    }


//   resultData.push("Restaurant budget: " + newRestaurantBudget);
        fs.writeFile("./output/OutputData.txt", resultData.join("\n"), (err) => {
            if (err) console.log(err);
        });
        fs.writeFile("./output/Audit.txt", resultAuditList.join("\n"), (err) => {
            if (err) console.log(err);
        });

}
res()


