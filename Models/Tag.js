const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Tag', TagSchema)