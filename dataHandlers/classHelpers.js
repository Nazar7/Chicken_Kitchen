

class DataReceiver {

    constructor(ordersList) {
        this.ordersList = ordersList
      }

getParseInputData (ordersList) {
    console.log("OKKKKKK")
    const parsInputData = []
    let tableCustomers = []
    for (let i = 0; i <= ordersList.length-1; i++) {
      console.log()
      let tableParsInputData = ordersList[i].split(", ")
      let actionName = tableParsInputData.shift();
        tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
        tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
        let [action, arg, val] = [actionName, tableCustomers, tableOrders]
        parsInputData.push({ action, arg, val });
    }
    return parsInputData

}
}

module.exports  = DataReceiver