const fs = require('fs');
const csv = require("csv-parser");

const getRegularCustomersFromFile = () => {
    let results = [];

    return new Promise((res, rej) => {
        fs.createReadStream("data/RegularCustomersAllergies.csv")
            .pipe(csv())
            .on('error', (err) => rej(err))
            .on("data", (data) => results.push(data))
            .on("end", () => res(results));
    });
};

const getBaseIngredientFromFile = () => {
    // :)
};

module.exports = {
    getRegularCustomersFromFile
};
