module.exports = class WarehousDataParse {
    constructor(data) {
        this.data = data.warehousData;
      }
      parsedWarehousData() {
          let parsedWarehousData = this.data.split(", ")
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
          console.log(warehousDataList)
          return warehousDataList
          }
}


// const getWarehousData = new WarehousData(resultHandleDatas);


// module.exports = WarehousData;