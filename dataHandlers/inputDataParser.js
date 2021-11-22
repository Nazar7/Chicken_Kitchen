module.exports = class InputDataParse {
    constructor(data) {
        this.data = data.inputData;
      }
    parsedInputData () {
    let inputData = this.data.split('\n');
         const parsInputData = []
         let tableCustomers = []
        
         for (let i = 0; i <= inputData.length-1; i++) {
           console.log(inputData[0])
           if(inputData[i].split(', ')[0] === 'Order'){
            let tableParsInputData = inputData[i].split(", ")
            //  console.log(tableParsInputData)
             let actionName = tableParsInputData.shift();
               tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
               let tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
               let [action, arg, val] = [actionName, tableCustomers, tableOrders]
               parsInputData.push({ action, arg, val });
           }
           let tableParsInputData = inputData[i].split(", ")
          //  console.log(tableParsInputData)
           let actionName = tableParsInputData.shift();
             tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
             let tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
             let [action, arg, val] = [actionName, tableCustomers, tableOrders]
             parsInputData.push({ action, arg, val });
         }
        
        // console.log(parsInputData)
        return parsInputData
    }
}


// module.exports = class InputDataParse {
//   constructor(data) {
//       this.data = data.inputData;
//     }
//   parsedInputData () {
//   let inputData = this.data.split('\n');
//        const parsInputData = []
//        let tableCustomers = []
//        let parseOrderList = {}
      
//        for (let i = 0; i <= inputData.length-1; i++) {
//         if(inputData[i].split(', ')[0] === 'Order'){
//           for (let item = 0; item < inputData[i].split(', ').length-1; item++) {
//             parseOrderList[inputData[i].split(', ')[item+1]] = inputData[i].split(', ')[item+2]
//             item = item + 1
//           }
//           let tableParsInputData = inputData[i].split(", ")
//          let actionName = tableParsInputData.shift();
//          let tableOrders = ""
//           let [action, arg, val] = [actionName, parseOrderList, tableOrders]
//           parsInputData.push({ action, arg, val });
//         } 
//          let tableParsInputData = inputData[i].split(", ")
//          console.log(tableParsInputData)
//          let actionName = tableParsInputData.shift();
//            tableCustomers = tableParsInputData.slice(0,tableParsInputData.length/2);
//            let tableOrders = tableParsInputData.slice(tableParsInputData.length/2,tableParsInputData.length);
//            let [action, arg, val] = [actionName, tableCustomers, tableOrders]
//            parsInputData.push({ action, arg, val });
//        }
      
//       console.log(parsInputData)
//       return parsInputData
//   }
// }