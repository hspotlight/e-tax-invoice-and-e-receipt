const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("node:fs");

const base_url = "https://interapp3.rd.go.th/signed_inter/publish/register.php";

const rawData = [];

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function scrapeData(pageNumber) {
  const url = `${base_url}?page=${pageNumber}`;

  let lastPage = -1;
  try {
    // Send a GET request to the URL
    const response = await axios.get(url);

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);
    lastPage = $('ul.pagination li:last-child a').text();

    // Locate the table and extract data
    $("table tr").each((index, element) => {
      // Process the data as needed
      if (index === 0) {
        return;
      }
      const cells = $(element).find("td");
      const record = {};
      cells.each((cellIndex, cellElement) => {
        // Process cell data as needed
        const text = $(cellElement).text().trim().replace(/\s+/, "");
        if (cellIndex === 0) record["id"] = text;
        if (cellIndex === 1) record["tax"] = text;
        if (cellIndex === 2) record["name"] = text;
        if (cellIndex === 3) record["startDateTh"] = text;
        if (cellIndex === 4) record["endDateTh"] = text;
        if (cellIndex === 5) record["rdBranch"] = text;
      });
      record["source"] = "email";
      rawData.push(record);
    });
  } catch (error) {
    console.error(
      `Failed to retrieve page ${pageNumber}. Error: ${error.message}`
    );
  } finally {
    // Generate a random delay between 300 and 1000 milliseconds
    const delay = getRandomDelay(300, 1000);

    await new Promise((resolve) => setTimeout(resolve, delay));
    return lastPage;
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

async function main() {
  console.log('fetch page 1');
  const lastPage = await scrapeData(1);
  console.log('last page is ', lastPage);
  for (let page = 2; page <= lastPage; page++) {
    console.log('fetch page ', page);
    await scrapeData(page)
  }
  writeFile(rawData);
}

main();
