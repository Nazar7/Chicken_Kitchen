
const resultHandleDatas = require('./handleIAllDatasFromFiles');


 class WarehousData {
    constructor(data) {
        this.data = data;
      }

    getParsedWarehousData() {

       console.log(this.data)
      // (async function() {
      //   var a = await this.datasFromFile();
      //   console.log("a->", a);
      // })();

            // let res =  this.datasFromFile().then(a => a)
            // return console.log(res)

    
        // console.log(dataFromFiles())
          let parsedWarehousData = dataFromFiles.warehousData.split(", ")
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

          subtractWarehousQuontity(){
            console.log(this.warehousDataList)
          }
}

const DATA = (async () => await resultHandleDatas())()

const getWarehousData = new WarehousData(DATA);


module.exports = getWarehousData;