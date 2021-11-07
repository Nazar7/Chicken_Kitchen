const getParseWarehousData = (warehousData) => {
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
      uniqueListOfDish.map((item, index, arr) => {
          if(item in parsedWarehouseStock){
             parsedWarehouseStock[item] = parsedWarehouseStock[item]-1
          return
          }
        })
            return parsedWarehouseStock
    
    }


  module.exports = {
    getParseWarehousData,
    getBalanceAtWarehous
  };