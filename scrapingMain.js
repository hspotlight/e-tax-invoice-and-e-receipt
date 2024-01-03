const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("node:fs");

const base_url = 'https://interapp3.rd.go.th/signed_inter/publish/register.php';
const total_pages = 1;

const rawData = [];

async function scrapeData(pageNumber) {
    const url = `${base_url}?page=${pageNumber}`;

    try {
        // Send a GET request to the URL
        const response = await axios.get(url);

        // Load the HTML content into cheerio
        const $ = cheerio.load(response.data);

        // Locate the table and extract data
        $('table tr').each((index, element) => {
            // Process the data as needed
            if (index === 0) {
                return;
            }
            const cells = $(element).find('td');
            const record = {};
            cells.each((cellIndex, cellElement) => {
                // Process cell data as needed
                const text = $(cellElement).text().trim();
                if (cellIndex === 0) record['id'] = text;
                if (cellIndex === 1) record['tax'] = text;
                if (cellIndex === 2) record['name'] = text;
                if (cellIndex === 3) record['startDateTh'] = text;
                if (cellIndex === 4) record['endDateTh'] = text;
                if (cellIndex === 5) record['rdBranch'] = text;
            });
            rawData.push(record);
        });
    } catch (error) {
        console.error(`Failed to retrieve page ${pageNumber}. Error: ${error.message}`);
    }
    finally {
        return true;
    }
}

function writeFile(json) {
    fs.writeFile("rawdata/data_email.json", JSON.stringify(json), (err) => {
    if (err) {
        console.error(err);
    }
    // file written successfully
    });
}


// Loop through all pages and scrape data

async function main () {
    const requests = [];
    for (let page = 1; page <= total_pages; page++) {
        console.log('scraping page', page);
        requests.push(scrapeData(page));
    }
    await Promise.all(requests);
    writeFile(rawData);
}

main();

