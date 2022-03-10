const express = require('express')
const router = express.Router()

const authController = require('../Controllers/authController')

router.post("/signup", authController.Signup)
router.post("/signin", authController.Signin)

module.exports = router