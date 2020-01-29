const mysql = require('mysql2');

function createconnection(){
    let pool = mysql.createConnection({
        host: 'yuzudigital.com',
        user: 'yuzu_admin',
        password: 'P@ssw0rd',
        database: 'creamparuay',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        timezone: "utc"
    });
    return pool;
}

async function selectData(sql){
    let res = await queryDatabase(sql);
    return res;
}

async function insertData(sql){
    let res = await queryDatabase(sql);
    return res;
}

async function updateData(sql){
    let res = await queryDatabase(sql);
    return res;
}

async function deleteData(sql){
    let res = await queryDatabase(sql);
    return res;
}

async function queryDatabase(sql){
    let res = {
        isSucceed:false,
        result:null,
        message:"",
    };
    let dbpool = await createconnection();
    const result = await dbpool.promise().query(sql);
    dbpool.destroy();
    res.isSucceed = true;
    res.result = result[0];
    return res;
}


let dbConst = {
    selectData:selectData,
    insertdata:insertData,
    updatedata:updateData,
    deletedata:deleteData
}

module.exports = dbConst;