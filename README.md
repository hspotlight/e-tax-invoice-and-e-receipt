## Background of this project
This project is aim to simplify the process to check merchants that register for e-tax invoice & e-receipt. The problem is the original website allows us to search with only tax id. It is too difficult for us(TH citizen) to get tax number of merchants. To simplify the process, we want an ability to query merchants by their name and to do that we need to make a search page to query by name.

## What is it?
This project is a ETL project that will extract the data from [etax.rd.go.th](https://etax.rd.go.th/etax_staticpage/app/#/index/registered#top), transform to remove duplicated objects and load it to Algolia project.

The ETL will run every 12 hr every day. (12 am and 12 pm UTC time)

## Algolia project
The uploaded data will be prompt for query in this [UI](https://dashboard.algolia.com/interface-demos/16ce4179-4f05-40ef-9cb1-4e267297c1c6).

## Development Guide
use node version - 18.17.0 because we use node:fs for saving output