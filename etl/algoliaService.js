// hello_algolia.js
const algoliasearch = require("algoliasearch");

// Connect and authenticate with your Algolia app
const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_APPLICATION_KEY
);
const index = client.initIndex("prod");

const testSearch = () => {
  return index.search("ลาซาด้า");
};

const replaceAllObjects = (data) => {
  return index.replaceAllObjects(data, { autoGenerateObjectIDIfNotExist: true });
};

const algoliaService = {
  replaceAllObjects,
};

exports.algoliaService = algoliaService;
