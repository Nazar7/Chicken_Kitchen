const fs = require("fs");


const resultHandleDatas = require('./dataHandlers/handleIAllDatasFromFiles.js');

const getWarehousData = require('./dataHandlers/warehousDataCalculation.js')
getWarehousData.getParsedWarehousData(resultHandleDatas)


const getData  = require("./services/getDataFromFile")
const getDataFromCsv  = require("./services/getDataFromCsvFile")
const getBuyActions  = require("./helpers/actionClass")
const getOrderActions  = require("./helpers/actionClass")

// const getParsedInputData = require("./dataHandlers/handleInputDataClass")


const {
  getBuyAction,
  getTableAction,
  getOrderAction,
  getBudgetAction,
  getAuditAction
  } = require("./helpers/actionFunctions.js")

const res =  async () => {

 

  const datasFromFiles = await resultHandleDatas()
  let restaurantBudget = 500;
  var resultData = [];
  resultData.push("Restaurant budget: " + restaurantBudget);
  let newRestaurantBudget = restaurantBudget;
  let auditList = []
  let auditResult = []
  for (let i = 0; i <= datasFromFiles.parsedInputData.length-1; i++) {
    let data = datasFromFiles.parsedInputData[i]
    let customer = "";
    let order = "";
    let commands = JSON.parse(datasFromFiles.commandList)
    let commandActivity = commands[Object.keys(commands).find(key => key.toLowerCase() === data.action.toLowerCase())]
    customer = datasFromFiles.parsedInputData[i].arg[0]
    order = datasFromFiles.parsedInputData[i].val[0]

    console.log("OKKKKKOKOKOKOKOKOK")
getWarehousData.subtractWarehousQuontity(datasFromFiles)
 
    getBuyActions.buyActionResult(datasFromFiles, data, customer, order)
    // getOrderActions.orderActionResult(datasFromFiles, data, customer, order)
    // console.log(getBuyActions.buyActionResult(datasFromFiles, data, customer, order))
 break
    // let datassss = getActions.consol(datasFromFiles, customer)

    if (commandActivity !== "yes"){
      let resultOfOrder = data.action + " command disabled";
      resultData.push(resultOfOrder)
     }
    else if (newRestaurantBudget > 0 && datasFromFiles.parsedInputData[i].action === 'Budget' && datasFromFiles.parsedInputData[i].arg[0] === "="){
      let result = getBudgetAction(datasFromFiles, data)
      newRestaurantBudget = result[1]
      resultData.push(result.join(""))
    } else if (newRestaurantBudget > 0 && datasFromFiles.parsedInputData[i].action === 'Budget' && datasFromFiles.parsedInputData[i].arg[0] === "+") {
    
      let result = getBudgetAction(datasFromFiles, data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && datasFromFiles.parsedInputData[i].action === 'Budget' && datasFromFiles.parsedInputData[i].arg[0] === "-") {
   
      let result = getBudgetAction(datasFromFiles, data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && datasFromFiles.parsedInputData[i].action === 'Table') {
      order = datasFromFiles.parsedInputData[i].val
      let res = getTableAction(
        dataForBuyAction
        )
        let customersOrderData = res[2].join("\n")
        resultData.push(res[1], customersOrderData)
   
    } else if (newRestaurantBudget > 0 && datasFromFiles.parsedInputData[i].action === 'Buy') {
      order = datasFromFiles.parsedInputData[i].val[0]
      customer = datasFromFiles.parsedInputData[i].arg[0]

      let res = getBuyAction(
        datasFromFiles,
        data,
        i,
        order,
        customer,
        newRestaurantBudget,
        )
        resultData.push(res.resultOfOrder)
         newRestaurantBudget = res.newRestaurantBudget
        auditList.push({
          comand: res.resultOfOrder,
          Warehouse: res.warehous,
          Budget: newRestaurantBudget
        })
       
    } else if (datasFromFiles.parsedInputData[i].action === 'Order'){

    let res = getOrderAction(datasFromFiles, data, newRestaurantBudget,) 
    resultData.push(res.resultOfOrder)
    newRestaurantBudget = res.newRestaurantBudget
    auditList.push({
      comand: res.resultOfOrder + "-> success",
      Warehouse: res.warehous,
      Budget: newRestaurantBudget,
    })
    } 
    else if (datasFromFiles.parsedInputData[i].action === 'Audit'){
      let res = getAuditAction(auditList)
      auditResult.push(res)
      }
      
    else resultData.push("RESTAURANT BANKRUPT")
  }

  resultData.push("Restaurant budget: " + newRestaurantBudget);
  fs.writeFile("./output/OutputData.txt", resultData.join("\n"), (err) => {
    if (err) console.log(err);
  });
  fs.writeFile("./output/Audit.txt", auditResult.join(), (err) => {
    if (err) console.log(err);
  });
}
res(getData.getDataFromInputFile, getDataFromCsv.getDataFromFile)


