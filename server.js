require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.DB_STRING

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        //body parser before CRUD ops
        app.use(bodyParser.urlencoded({ extended: true }))

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

        app.post('/quotes', (req, res) => {
            console.log(req.body)
          })
          
        app.listen(3000, () => {
            console.log('listening on 3000')
        })
    })
    .catch(err => console.log(err))







