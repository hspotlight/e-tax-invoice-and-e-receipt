const eTaxRdUrl = "https://etax.rd.go.th/rd/services/rs.registeredlist/searchNew";
// "body": "{\"pageNum\":1,\"pageSize\":10}"

const getTotalSize = async () => {
    return Promise.resolve(100);
}

const getAllRecords = async () => {
    const totalSize = await getTotalSize();
    return Promise.resolve([{}, {}]);
}

const eTaxService = {
    getAllRecords
}

exports.eTaxService = eTaxService;