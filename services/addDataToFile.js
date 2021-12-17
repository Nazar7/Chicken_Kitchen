const fs = require("fs");

class DataWriter {
    writeFile = (filePath, data) => {
        fs.writeFileSync(filePath, data);
    }
}

const dataWriter = new DataWriter();

module.exports = dataWriter;