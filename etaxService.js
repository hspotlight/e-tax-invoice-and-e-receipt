const axios = require("axios");
const eTaxRdUrl =
  "https://etax.rd.go.th/rd/services/rs.registeredlist/searchNew";

const eTaxApi = async (pageSize = 10) => {
  return axios
    .post(eTaxRdUrl, {
      pageNum: 1,
      pageSize: pageSize,
    })
    .then((r) => r.data);
};

const getAllRecords = async () => {
  const totalSize = (await eTaxApi()).totalsize;
  const { data } = await eTaxApi(totalSize);
  const result = [];
  data.forEach((d) => {
    result.push(d[d.length - 1]);
  });
  return result;
};

const eTaxService = {
  getAllRecords,
};

exports.eTaxService = eTaxService;
