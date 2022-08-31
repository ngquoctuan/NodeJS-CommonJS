
// var outSuc = function (res, mess) {

//     return res.status(200).json(mess);
// }
// var outFail = function (res, mess) {

//     return res.status(500).json(mess);
// }
const FORBIDEN = 503
const SERVER_ERROR = 500;

const out = {
    Suc: async (res, mess) => {
        const objResponse = {
            internalCode: 1,
            serverIP: "123.145.123.123",
            msg: mess
        }
        return res.status(200).json(objResponse);
    },
    badRq: async (res, mess) => {
        return res.status(400).json(mess);
    },
    notFd: async (res, mess) => {
        return res.status(404).json(mess);
    },
    Fail: async (res, mess) => {
        return res.status(SERVER_ERROR).json(mess);
    }
}
module.exports = out;