const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
// app.use(express.json())

let routes = require('./api/routes')
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)
