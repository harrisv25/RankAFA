const mongoose = require('mongoose')

const artSchema = new mongoose.Schema(  {
    name: {type: String, required: true},
    authorName: {type: String, required: true},
    description: String,
    img: String},
    { timestamps: true }
    );

const Art = mongoose.model('Product', artSchema);

module.exports = Art
