require('dotenv').config()
const express = require('express')
const app = express ()
const port =process.env.port

const mongoose = require('mongoose')
const db = mongoose.connection
const mongoURI = 'mongodb://localhost:27017/mongooseStore'

const Gallery = require('./models/artPiece.js')

// const Product = require('./models/products.js')

const methodOverride = require('method-override');

mongoose.connect(mongoURI, () => {
    console.log('The connection with mongod is established')
  })

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

app.get('/seed', async (req, res) => {
    const newArt =
      [
        {
            name: 'Real Goku',
            authorName: 'Kimonasart from Kimonasart.deviantart.com',
            description: 'Realistic Goku Depiction',
            img: 'https://i.imgur.com/gDV3Z7Q.jpeg'
        },
        {
            name: 'Gear 5 Luffy',
            authorName: 'LeleoSpeedarts',
            description: 'Luffy Gear 5 Anime Style',
            img: 'https://i.imgur.com/hSrSj4h.jpeg'
        }
        // {
        //   name: 'Beans',
        //   description: 'A small pile of beans. Buy more beans for a big pile of beans.',
        //   img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
        //   price: 5,
        //   qty: 99
        // }, {
        //   name: 'Bones',
        //   description: 'It\'s just a bag of bones.',
        //   img: 'http://bluelips.com/prod_images_large/bones1.jpg',
        //   price: 25,
        //   qty: 0
        // }, {
        //   name: 'Bins',
        //   description: 'A stack of colorful bins for your beans and bones.',
        //   img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
        //   price: 7000,
        //   qty: 1
        // }
      ]
    try {
      const seedArt = await Gallery.create(newArt)
      res.send(seedArt)
    } catch (err) {
      res.send(err.message)
    }
  })
  

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

// Product.find({}, (err, allProducts) => {
//     console.log(allProducts)
//     });

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get("/rankAfa", (req,res) => {
    Gallery.find({}, (err, art)=>{
        res.render('index.ejs', {
            allArt: art
        });
    });
})


// app.get('/store/new', (req, res) => {
//     res.render('new.ejs')
// })

// app.post('/store', (req, res) => {
//     console.log(req.body)
//     Product.create(req.body, (err, product) => {
//         if(err) { 
//           console.log(err)
//         } else { 
//           console.log(product)
//         }
//         // db.close()
//     })
//         res.redirect('/store')
//   })


// app.get("/store/:id", (req, res) => {
//     Product.find({_id: req.params.id}, (err, product)=>{
//         res.render('show.ejs', {
//             oneProduct: product[0],
//         });
//     })
// })

// app.delete('/store/:id', (req, res) => {
//     Product.findByIdAndRemove(req.params.id, (err, data)=>{
//         res.redirect('/store') //redirect back to fruits index
//     })
// })

// app.get('/store/:id/edit', (req, res)=>{
//     Product.findById(req.params.id, (err, foundProduct)=>{ //find the fruit
//         console.log(foundProduct)
//         res.render(
//     		'edit.ejs',
//     		{
//     			product: foundProduct //pass in found fruit
//     		}
//     	)
//     })
// })


// app.put('/store/:id/buy', (req, res) => { 
// 	Product.findByIdAndUpdate(req.params.id, {$inc: {qty: -1}}, (err, updatedModel)=>{
//         res.redirect('/store')
//     })
// })

// app.put('/store/:id', (req, res) => { 
// 	Product.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
//         res.redirect('/store')
//     })
// })


app.listen(port, () => {
    console.log(   `Listening on ${port}`)
})