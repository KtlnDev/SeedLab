const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    server:"127.0.0.1",
    port:'3306',
    user:'root',
    password:'Mydatabase2021',
    database:'usersdb'
})

app.use(cors());

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO usertable (firstName, lastName, email, password) VALUES ('fname','lname','email1','passw');"
    db.query(sqlInsert, (err,result) =>{
        res.send("success")
    })
});

app.listen(3001, () => console.log('API is running on http://localhost:3001/'))