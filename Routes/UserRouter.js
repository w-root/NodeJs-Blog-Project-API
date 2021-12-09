const express = require('express')
const router = express.Router()

const userController = require('../Controllers/UserController')

router.post("/getUserDetails",userController.GetUserDetails)
router.post("/updateUser",userController.UpdateUser)

module.exports = router