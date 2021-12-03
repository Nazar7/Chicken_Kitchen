module.exports = class InputDataParse {
  constructor(data) {
      this.data = data.inputData;
    }
    
  parsedInputData () {
  let inputData = this.data.split('\r\n');
       const parsInputData = []
       let tableCustomers = []
       let tableParsInputData = []
       let parseOrderList = {}
       for (let i = 0; i <= inputData.length-1; i++) {
          tableParsInputData = inputData[i].split(", ")
          let actionName = tableParsInputData.shift();
           tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
           let tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
           let [action, arg, val] = [actionName, tableCustomers, tableOrders]
           parsInputData.push({ action, arg, val });
       }
      return parsInputData
  }
}