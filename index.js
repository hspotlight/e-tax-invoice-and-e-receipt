require("dotenv").config();
const { eTaxService } = require("./etaxService");
const { algoliaService } = require("./algoliaService");
const fs = require("node:fs");

const saveJson = process.env.SAVE_JSON;

const handler = async () => {
  console.log("program start");
  const result = await eTaxService.getAllRecords();
  console.log("total list from etax.rd.go.th = ", result.length);

  if (saveJson) {
    fs.writeFile("output/data.json", JSON.stringify(result, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  } else {
    algoliaService
      .replaceAllObjects(result)
      .then(({ objectIDs }) => {
        console.log("updated list length = ", objectIDs.length);
        console.log("done");
      })
      .catch((e) => {
        console.log("error", e);
      });
  }
};

handler();
