const axios = require("axios");
const mockData = require("./rawdata/data_efilling.json");
const eTaxRdUrl =
  "https://efiling.rd.go.th/rd-questionnaire-service/etax/search";

const categoryUrl =
  "https://efiling.rd.go.th/rd-questionnaire-service/etax/search/u";

const categoryApi = async (pageSize = 10) => {
  return axios.post(categoryUrl, {}).then((r) => r.data);
};

const eTaxApi = async (pageSize = 4000) => {
  return axios
    .post(eTaxRdUrl, {
      isic: null,
      taxName: null,
      taxNo: null,
      index: 1,
      page: pageSize,
    })
    .then((r) => r.data);
};

const getAllRecords = async () => {
  // const totalSize = 4000; // get this from the website https://efiling.rd.go.th/
  // const { data } = await eTaxApi(totalSize);
  const data = mockData;
  return data.map((d) => {
    return {
      tax: d.nid,
      name:
        d.entrepreneurName && d.entrepreneurName !== "-"
          ? d.entrepreneurName.trim().replace(/\s+/, " ")
          : d.companyName.trim().replace(/\s+/, " "),
      isVat: d.vatFlag,
      docTaxInvoiceFlag: d.docTaxInvoiceFlag,
      docRecieptFlag: d.docTaxInvoiceFlag,
      regisDateTh: d.regisDateTh,
      startDateTh: d.startDateTh,
      endDateTh: d.endDateTh,
      isicCode: d.isicCode,
      isicName: d.isicName,
      sourceFlag: d.sourceFlag,
      source: "e-filling"
    };
  });
};

const efillingService = {
  getAllRecords,
  categoryApi,
};

exports.efillingService = efillingService;
