const Post = require('../Models/Post')
const User = require('../Models/User')
const PostValidator = require('../Helpers/Validators/PostValidator')

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').populate('tags')
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.addPost = (req, res) => {
    const { error } = PostValidator.validate(req.body);
    if (error)
        res.status(400).json({ message: error.details[0].message })

    const post = {
        ...req.body.post, user: req.body.id
    }
    try {
        Post.create(post)
        res.status(200).json({ message: "Eklendi" })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate('user')
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error)
    }
}


exports.getPostTags = async (req, res) => {
    try {
        const posts = await Post.find().populate('tags').select('tags')
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getUserPostsById = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id })
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.getUserPostsByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ user: user._id })
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}
