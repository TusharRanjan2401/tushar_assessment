const csv = require("csv-parser");
const { Readable } = require("stream");

function parseCSV(csvData) {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(csvData);
    stream
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim(),
        skipLines: 0
      }))
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

module.exports = parseCSV;
