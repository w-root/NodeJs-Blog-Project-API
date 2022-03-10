const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.CreateToken = (user) => {
    const token = jwt.sign({
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60,
        issuer: "www.blogemo.com",
        id: user._id
    }, process.env.SECRET_KEY)
    return token
}

exports.CreatePasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

