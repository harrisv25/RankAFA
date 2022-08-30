const express = require('express');
const router = express.Router()

const Gallery = require('../models/artPiece.js')


//Index
router.get('/', async (req,res) => {
    console.log('Temp Page')
})

router.get("/:org", (req,res) => {
  if (req.params.org === 'top') {
    Gallery.find({}, (err, art)=>{
      res.render('topRanked.ejs', {
          allArt: art
      });
    }).sort({'rank' : -1});
  } else if (req.params.org === 'newest') {
    Gallery.find({}, (err, art)=>{
      res.render('newest.ejs', {
          allArt: art
      });
    }).sort({'createdAt' : -1});
  }
})

module.exports = router