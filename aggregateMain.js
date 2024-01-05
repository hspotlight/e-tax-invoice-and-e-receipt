const fs = require('node:fs');

// Read the content of the three JSON files
const etaxData = JSON.parse(fs.readFileSync('output/data_etax.json', 'utf-8'));
const efillingData = JSON.parse(fs.readFileSync('output/data_efilling.json', 'utf-8'));
const emailData = JSON.parse(fs.readFileSync('rawdata/data_email.json', 'utf-8'));

// Combine unique "tax" values from all files
const allTaxValues = new Set([...etaxData.map(item => item.tax), ...efillingData.map(item => item.tax), ...emailData.map(item => item.tax)]);

// Combine the data based on the unique "tax" values
const combinedData = Array.from(allTaxValues).map(tax => {
    const matchingEtaxItem = etaxData.find(item => item.tax === tax) || {};
    const matchingEfillingItem = efillingData.find(item => item.tax === tax) || {};
    const matchingEmailItem = emailData.find(item => item.tax === tax) || {};

    return {
        ...matchingEtaxItem,
        ...matchingEfillingItem,
        ...matchingEmailItem,
    };
});

// Save the combined data as output
fs.writeFileSync('output/combined_data.json', JSON.stringify(combinedData, null, 2));

console.log('Combined data saved to output/combined_data.json');
