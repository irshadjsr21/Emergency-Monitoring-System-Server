const express = require('express');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host : "localhost" ,
    user: "root",
    database: "hackon"
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connection established');
});

const app = express();

app.listen('3000', () => {
    console.log('Server started')
});