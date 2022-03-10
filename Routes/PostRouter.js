const express = require('express')
const router = express.Router()

const cache = require('../Cache/RouteCache')
const postController = require('../Controllers/PostController')

router.get("/", cache(10), postController.getPosts)
router.get("/getPostTags", postController.getPostTags)
router.get("/:slug", postController.getPost)
router.get("/getUserPosts/:id", postController.getUserPostsById)
router.get("/getUserPostsByUsername/:username", postController.getUserPostsByUsername)

router.post("/new-post", postController.addPost)

module.exports = router