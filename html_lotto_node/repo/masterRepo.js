var _db = require('./db');

async function getHuay1() {

    let sqlStr = "SELECT * FROM huay1";
    console.log("sqlStr : ", sqlStr);
    let res = await _db.selectData(sqlStr);
    console.log("result huay1: ",res.result);

    return res.result;
}

let master = {
    getHuay1: getHuay1
}

module.exports = master;