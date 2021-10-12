const fs = require("fs");
const csv = require("csv-parser");

const getDataFromFile = (filePath) => {
  let results = [];

  return new Promise((res, rej) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("error", (err) => rej(err))
      .on("data", (data) => results.push(data))
      .on("end", () => res(results));
  });
};

module.exports = {
  getDataFromFile,
};
