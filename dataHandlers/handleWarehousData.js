const getParseWarehousData = (warehousData) => {
  console.log(warehousData)
    let parsedWarehousData = warehousData.split(", ")
    let warehousDataList = {}
    const keys = parsedWarehousData.filter((item, index) => {
      return index % 2 == 0
    });
    const values = parsedWarehousData.filter((item, index) => {
      return index % 2 !== 0
    });
    let warehousList = keys.forEach((element, index) => {
      warehousDataList[element] = values[index]
    });
    return warehousDataList
    }

    const getBalanceAtWarehous = (parsedWarehouseStock, uniqueListOfDish) => {
      console.log(parsedWarehouseStock)
      console.log(uniqueListOfDish)
      
      // let warehouseStockAfterOrder = 
      // return parsedWarehouseStock
    }


  module.exports = {
    getParseWarehousData,
    getBalanceAtWarehous
  };