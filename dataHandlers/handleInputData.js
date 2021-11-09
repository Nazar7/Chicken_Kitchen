const getParseInputData = (ordersList) => {
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

  // console.log(parsInputData)
    // let parsInputData = [];
    // for (let i = 0; i <= ordersList.length-1; i++) {
    //   let [action, arg, val] = ordersList[i].split(", ");
    //   if (action !== ""  && arg !== "" && val !== "" && ordersList[i].length >= 3) {
    //     parsInputData.push({ action, arg, val });
    //   } else i++
    // }
    // return parsInputData
   }

   module.exports = {
    getParseInputData,

  };