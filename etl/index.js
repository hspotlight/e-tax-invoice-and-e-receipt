const { eTaxService } = require("./etaxService");

const handler = async (event, context) => {
    const result = await eTaxService.getAllRecords();
    console.log(result.length);
}

handler();