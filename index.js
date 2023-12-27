require("dotenv").config();
const { eTaxService } = require("./etaxService");
const { algoliaService } = require("./algoliaService");

const handler = async () => {
  console.log("program start");
  const result = await eTaxService.getAllRecords();
  console.log("total list from etax.rd.go.th = ", result.length);

  algoliaService
    .replaceAllObjects(result)
    .then(({ objectIDs }) => {
      console.log("updated list length = ", objectIDs.length);
      console.log("done");
    })
    .catch((e) => {
      console.log("error", e);
    });
};

handler();
