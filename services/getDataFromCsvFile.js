const fs = require("fs");
const csv = require("csv-parser");

class CsvDataReceiver {

    getDataFromFile(path) {
        let results = [];
        return new Promise((res, rej) => {
          fs.createReadStream("./data/" + path)
            .pipe(csv())
            .on("error", (err) => rej(err))
            .on("data", (data) => results.push(data))
            .on("end", () => res(results));
        });
      };
    }
      

const getDataFromCsv = new CsvDataReceiver();

module.exports = getDataFromCsv;