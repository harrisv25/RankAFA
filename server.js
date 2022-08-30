require('dotenv').config()
const express = require('express')
const app = express ()
const port =process.env.port

// var session = require('express-session')

// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: false, // https://www.npmjs.com/package/express-session#resave
// 	saveUninitialized: false // https://www.npmjs.com/package/express-session#resave
// }))

// app.use((req, res, next) => {
// 	res.locals.currentUser = req.session.currentUser
// 	next()
// })

const mongoose = require('mongoose')
const db = mongoose.connection
const mongoURI = 'mongodb://localhost:27017/mongooseStore'

// const Gallery = require('./models/artPiece.js')

// const Product = require('./models/products.js')

const methodOverride = require('method-override');

const artController = require('./controllers/artController.js')
app.use('/rankAfa', artController)

const rankController = require('./controllers/ranked.js')
app.use('/rank', rankController)

mongoose.connect(mongoURI, () => {
    console.log('The connection with mongod is established')
  })

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))


app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




// app.get('/seed', async (req, res) => {
//     const newArt =
//       [
//         {
//             name: 'Real Goku',
//             authorName: 'Kimonasart from Kimonasart.deviantart.com',
//             description: 'Realistic Goku Depiction',
//             img: 'https://i.imgur.com/gDV3Z7Q.jpeg',
//             rank: 10,
//             reviewCount: 12
//         },
//         {
//             name: 'Gear 5 Luffy',
//             authorName: 'LeleoSpeedarts',
//             description: 'Luffy Gear 5 Anime Style',
//             img: 'https://i.imgur.com/hSrSj4h.jpeg',
//             rank: 14,
//             reviewCount: 2
//         }
//       ]
//     try {
//       const seedArt = await Gallery.create(newArt)
//       res.send(seedArt)
//     } catch (err) {
//       res.send(err.message)
//     }
//   })
  

// db.on('open', () =>
//     Product.create( productSeed, ( err , data ) => {
//         if ( err ) console.log ( err.message )
//     console.log( "added provided product data" )
// }))

// Gallery.collection.drop();


// Gallery.find((err, gallery) => {
//     gallery.forEach(element => {
//         console.log(element.name)
//     });
// })

// Gallery.find({}, (err, allArt) => {
//     console.log(allArt)
//     });

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(methodOverride('_method'))

// app.get("/rankAfa", (req,res) => {
//     Gallery.find({}, (err, art)=>{
//         let num1 = Math.floor(Math.random() * art.length)
//         let num2 = Math.floor(Math.random() * art.length)
//         while (num1 === num2) {
//             num2 = Math.floor(Math.random() * art.length)
//         }
//         num1 = art[num1]
//         num2 = art[num2]
//         art = [num1, num2]
//         res.render('index.ejs', {
//             allArt: art
//         });
//     });
// })

// app.get('/rankAfa/add', (req, res) => {
//     res.render('add.ejs')
// })

// app.post('/rankAfa', (req, res) => {
//     console.log(req.body)
//     Gallery.create(req.body, (err, art) => {
//         if(err) { 
//           console.log(err)
//         } else { 
//           console.log(art)
//         }
//     })
//   })


// app.get("/rankAfa/:id", (req, res) => {
//     Gallery.find({_id: req.params.id}, (err, art)=>{
//         res.render('show.ejs', {
//             oneArt: art[0],
//         });
//     })
// })


// app.get("/topRanked", (req,res) => {
//     Gallery.find({}, (err, art)=>{
//         res.render('topRanked.ejs', {
//             allArt: art
//         });
//     }).sort({'rank' : -1});
// })

// app.get("/newest", (req,res) => {
//     Gallery.find({}, (err, art)=>{
//         res.render('newest.ejs', {
//             allArt: art
//         });
//     }).sort({'createdAt' : -1});
// })


// //I can allow for a user id field for each phote. The users can 
// //see a gallery of their own images and edit their own images. 


// app.delete('/rankAfa/:id', (req, res) => {
//     Gallery.findByIdAndRemove(req.params.id, (err, data)=>{
//         res.redirect('/rankAfa') //redirect back to fruits index
//     })
// })

// // app.get('/store/:id/edit', (req, res)=>{
// //     Product.findById(req.params.id, (err, foundProduct)=>{ //find the fruit
// //         console.log(foundProduct)
// //         res.render(
// //     		'edit.ejs',
// //     		{
// //     			product: foundProduct //pass in found fruit
// //     		}
// //     	)
// //     })
// // })


// app.put('/rankAfa/:id/vote', (req, res) => { 
// 	Gallery.findByIdAndUpdate(req.params.id, {$inc: {rank : 1, reviewCount: 1}}, (err, updatedModel)=>{
//         res.redirect('/rankAfa')
//     })
// })

// // app.put('/store/:id', (req, res) => { 
// // 	Product.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
// //         res.redirect('/store')
// //     })
// // })


app.listen(port, () => {
    console.log(   `Listening on ${port}`)
})