require("dotenv").config();
const { eTaxService } = require("./etaxService");
const { algoliaService } = require("./algoliaService");

const handler = async (event, context) => {
  const result = await eTaxService.getAllRecords();
  console.log(result.length);

  algoliaService.replaceAllObjects(result).then(({ objectIDs }) => {
    console.log(objectIDs.length);
    console.log("done");
  }).catch((e) => {
    console.log(e)
  });
};

handler();
