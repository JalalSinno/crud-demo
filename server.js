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
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')

        //MIDDLEWARE

        //body parser before CRUD ops
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        //READ
        app.get('/', (req, res) => {
            quotesCollection.find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results })
                })
                .catch(err => console.log(err))
        })

        //CREATE
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(err => console.log(err))
          })
        
        //UPDATE
        app.put('/quotes', (req, res) => {
           quotesCollection.findOneAndUpdate(
                {name: 'test'},
                {
                    $set:{
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true,
                }
           )
           .then(result => res.json('Success'))
           .catch(err => console.log(err))
        })

        app.listen(3000, () => {
            console.log('listening on 3000')
        })
    })
    .catch(err => console.log(err))







