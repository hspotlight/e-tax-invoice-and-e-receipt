require("dotenv").config();
const { efillingService } = require("./efillingService");
// const { algoliaService } = require("./algoliaService");
const fs = require("node:fs");

const handler = async () => {
  console.log("program start");
  const result = await efillingService.getAllRecords();
  console.log("total list from etax.rd.go.th = ", result.length);

  fs.writeFile("output/data_efilling.json", JSON.stringify(result), (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};

handler();
