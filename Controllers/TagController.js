const Tag = require('../Models/Tag')

exports.getAllTag = async (req, res) => {
    try {
        const tags = await Tag.find()
        res.status(200).json(tags)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.addTag = (req, res) => {
    try {
        Tag.create(req.body)
        res.status(200).json({ message: 'Eklendi' })
    } catch (error) {
        res.status(400).json(error)
    }
}