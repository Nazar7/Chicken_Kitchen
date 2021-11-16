const fs = require("fs");

const resultHandleDatas = require('./dataHandlers/handleIAllDatasFromFiles.js');

const getData  = require("./services/getDataFromFile")
const getDataFromCsv  = require("./services/getDataFromCsvFile")

// const getParsedInputData = require("./dataHandlers/handleInputDataClass")


const {
  getBuyAction,
  getTableAction,
  getOrderAction,
  getBudgetAction,
  getAuditAction
  } = require("./helpers/actionFunctions.js")

const res =  async () => {

  const resultAllDatas = await resultHandleDatas()
  let restaurantBudget = 500;
  var resultData = [];
  resultData.push("Restaurant budget: " + restaurantBudget);
  let newRestaurantBudget = restaurantBudget;
  let auditList = []
  let auditResult = []
  for (let i = 0; i <= resultAllDatas.parsedInputData.length-1; i++) {
    let data = resultAllDatas.parsedInputData[i]
    let customer = "";
    let order = "";
    let commands = JSON.parse(resultAllDatas.commandList)
    let commandActivity = commands[Object.keys(commands).find(key => key.toLowerCase() === data.action.toLowerCase())]

    if (commandActivity !== "yes"){
      let resultOfOrder = data.action + " command disabled";
      resultData.push(resultOfOrder)
     }
    else if (newRestaurantBudget > 0 && resultAllDatas.parsedInputData[i].action === 'Budget' && resultAllDatas.parsedInputData[i].arg[0] === "="){
      let result = getBudgetAction(resultAllDatas, data)
      newRestaurantBudget = result[1]
      resultData.push(result.join(""))
    } else if (newRestaurantBudget > 0 && resultAllDatas.parsedInputData[i].action === 'Budget' && resultAllDatas.parsedInputData[i].arg[0] === "+") {
    
      let result = getBudgetAction(resultAllDatas, data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && resultAllDatas.parsedInputData[i].action === 'Budget' && resultAllDatas.parsedInputData[i].arg[0] === "-") {
   
      let result = getBudgetAction(resultAllDatas, data)
      newRestaurantBudget = result[1]
      resultData.push(result)
    } else if (newRestaurantBudget > 0 && resultAllDatas.parsedInputData[i].action === 'Table') {
      order = resultAllDatas.parsedInputData[i].val
      let res = getTableAction(
        dataForBuyAction
        )
        let customersOrderData = res[2].join("\n")
        resultData.push(res[1], customersOrderData)
   
    } else if (newRestaurantBudget > 0 && resultAllDatas.parsedInputData[i].action === 'Buy') {
      order = resultAllDatas.parsedInputData[i].val[0]
      customer = resultAllDatas.parsedInputData[i].arg[0]

      let res = getBuyAction(
        resultAllDatas,
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
       
    } else if (resultAllDatas.parsedInputData[i].action === 'Order'){

    let res = getOrderAction(resultAllDatas, data, newRestaurantBudget,) 
    resultData.push(res.resultOfOrder)
    newRestaurantBudget = res.newRestaurantBudget
    auditList.push({
      comand: res.resultOfOrder + "-> success",
      Warehouse: res.warehous,
      Budget: newRestaurantBudget,
    })
    } 
    else if (resultAllDatas.parsedInputData[i].action === 'Audit'){
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


