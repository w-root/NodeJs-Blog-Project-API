const express = require('express')
const router = express.Router()

const tagController = require('../Controllers/TagController')

router.get("/", tagController.getAllTag)
router.post("/add", tagController.addTag)

module.exports = router