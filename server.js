require('dotenv').config()
const express = require('express')
const app = express ()
const port =process.env.port

const mongoose = require('mongoose')
const db = mongoose.connection

const mongoURI = process.env.MONGODB_URI


const methodOverride = require('method-override');

mongoose.connect(mongoURI, () => {
    console.log('The connection with mongod is established')
  })

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))


app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


const artController = require('./controllers/artController.js')
app.use('/rankAfa', artController)

const rankController = require('./controllers/ranked.js')
app.use('/rank', rankController)


app.listen(port, () => {
    console.log(   `Listening on ${port}`)
})

