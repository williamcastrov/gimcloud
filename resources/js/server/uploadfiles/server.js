const express = require('express');
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(myconn(mysql, {
    host    :   'localhost',
    port    :   3306,
    user    :   'admon',
    password:   '12345678',
    database:   'gimbc_sys'
}))

app.use(cors());
app.use(express.static(path.join(__dirname, '../dbimages')));
//console.log("RUTA : ", __dirname)

app.use(require('./routes/routes'))

app.listen(9000, () => {
    console.log('server running on', 'http://127.0.0.1:' + 9000)
})