const express = require('express');
const router = express.Router()

const Gallery = require('../models/artPiece.js')

//Index
router.get('/', async (req,res) => {
    Gallery.find({}, (err, art)=>{
        let num1 = Math.floor(Math.random() * art.length)
        let num2 = Math.floor(Math.random() * art.length)
        while (num1 === num2) {
            num2 = Math.floor(Math.random() * art.length)
        }
        num1 = art[num1]
        num2 = art[num2]
        art = [num1, num2]
        res.render('index.ejs', {
            allArt: art
        });
    });
})


//Seed
router.get('/seed', async (req, res) => {
    const newArt =
      [
        {
            name: 'Real Goku',
            authorName: 'Kimonasart from Kimonasart.deviantart.com',
            description: 'Realistic Goku Depiction',
            img: 'https://i.imgur.com/gDV3Z7Q.jpeg',
            rank: 10,
            reviewCount: 12
        },
        {
            name: 'Gear 5 Luffy',
            authorName: 'LeleoSpeedarts',
            description: 'Luffy Gear 5 Anime Style',
            img: 'https://i.imgur.com/hSrSj4h.jpeg',
            rank: 14,
            reviewCount: 2
        }
      ]
    try {
      const seedArt = await Gallery.create(newArt)
      res.send(seedArt)
    } catch (err) {
      res.send(err.message)
    }
  })



// New
router.get('/add', (req, res) => {
    res.render('add.ejs')
})


//Create
router.post('/', (req, res) => {
  console.log(req.body)
  Gallery.create(req.body, (err, art) => {
      if(err) { 
        console.log(err)
      } else { 
        console.log(art)
      }
  })
})


//Show
router.get("/:id", (req, res) => {
  Gallery.find({_id: req.params.id}, (err, art)=>{
      res.render('show.ejs', {
          oneArt: art[0],
      });
  })
})


// DESTROY
router.delete('/:id', (req, res) => {
  Gallery.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/rankAfa') 
  })
})


//Update (Limited to voting)
router.put('/:id/vote', (req, res) => { 
	Gallery.findByIdAndUpdate(req.params.id, {$inc: {rank : 1, reviewCount: 1}}, (err, updatedModel)=>{
        res.redirect('/rankAfa')
    })
})


module.exports = router