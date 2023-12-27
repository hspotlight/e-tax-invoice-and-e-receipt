const { eTaxService } = require("./etaxService");

eTaxService.getAllRecords().then(x => console.log(x));