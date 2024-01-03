const fs = require('fs');

const getFileData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}: ${error.message}`);
        return null;
    }
};

const compareFiles = (fileA, fileB) => {
    const dataA = getFileData(fileA).taxes;
    const dataB = getFileData(fileB).taxes;

    if (dataA && dataB) {
        // Find elements in dataA that are not present in dataB
        const diffA = dataA.filter(objA => !(dataB.includes(objA)));

        // Find elements in dataB that are not present in dataA
        const diffB = dataB.filter(objB => !(dataA.includes(objB)));

        console.log(fileA, dataA.length);
        console.log(fileB, dataB.length);
        console.log(`Difference between ${fileA} and ${fileB}:\n`, diffA.length);
        console.log(`Difference between ${fileB} and ${fileA}:\n`, diffB.length);
    }
};

const filesToCompare = [
    'output/only_tax_of_data_efilling.json',
    'output/only_tax_of_data_etax.json',
    'output/only_tax_of_data_email.json',
];

// Find differences between pairs of files
for (let i = 0; i < filesToCompare.length - 1; i++) {
    for (let j = i + 1; j < filesToCompare.length; j++) {
        compareFiles(filesToCompare[i], filesToCompare[j]);
    }
}
