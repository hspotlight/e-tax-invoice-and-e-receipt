const fs = require('node:fs');

const fileName = "data_etax.json";
const inputFilePath = `rawdata/${fileName}`;
const outputFilePath = `output/only_tax_of_${fileName}`;

// Read the JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Extract the 'tax' fields from each JSON object
        const taxes = jsonData.map(item => item.tax);

        // Create a new object with only the 'tax' fields
        const onlyTaxes = { taxes };

        // Write the extracted 'tax' fields to a new file
        fs.writeFile(outputFilePath, JSON.stringify(onlyTaxes, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${err.message}`);
            } else {
                console.log(`Successfully wrote 'tax' fields to ${outputFilePath}`);
            }
        });
    } catch (parseError) {
        console.error(`Error parsing JSON: ${parseError.message}`);
    }
});
