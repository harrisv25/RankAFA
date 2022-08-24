const mongoose = require('mongoose')

const artSchema = new mongoose.Schema(  {
    name: {type: String, required: true},
    authorName: {type: String, required: true},
    description: String,
    img: String,
    rank: {type: Number, min: 0},
    reviewCount: {type: Number, min: 0}},
    { timestamps: true }
    );

const Art = mongoose.model('Product', artSchema);

module.exports = Art
