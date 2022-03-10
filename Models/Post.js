const mongoose = require('mongoose')
const slugify = require('slugify')

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: String,
    content: { type: String, required: true },
    slug: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

PostSchema.pre('validate', function (next) {      //title kullanarak slug oluşturup veritabanına kaydediyoruz -> Middleware
    this.slug = slugify(this.title, {
        lower: true,
        strict: true
    })
    next()
})

module.exports = mongoose.model('Post', PostSchema)