const mysql = require('mysql');
const DATABASE_URL='mysql://hyfty7k387df8ggwntp5:pscale_pw_egtVrTfHk7NnRPycU7DdqShEuiK5okmHo5HOmkTxdNF@us-east.connect.psdb.cloud/user?ssl={"rejectUnauthorized":true}'

const connection = mysql.createConnection(DATABASE_URL);

connection.connect((err) => {
    if (err) throw err;
});

//SQL QUERIES
const create = (sql, values) => new Promise((resolve, reject) => {
    connection.query(sql, [values], (error, results) => {
        if (error) {
            return reject(error);
        }
        return resolve(results);
    });
});

const findOne = (sql, values) => new Promise((resolve, reject) => {
    connection.query(sql, [values], (error, results) => {
        if (error) {
            return reject(error);
        }
        return resolve(results);
    });
});

const find = (sql, values) => new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
        if (error) {
            return reject(error);
        }
        return resolve(results);
    });
});

module.exports = { create, findOne, find };