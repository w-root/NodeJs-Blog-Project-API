const User = require('../Models/User')
const bcrypt = require('bcrypt')
const SigninValidator = require('../Helpers/Validators/SigninValidator')
const SignupValidator = require('../Helpers/Validators/SignupValidator')

const JwtHelper = require('../Helpers/Jwt/JwtHelper')
require('dotenv').config()

exports.Signup = async (req, res) => {
    const { error } = SignupValidator.validate(req.body)
    if (error)
        res.status(400).json({ message: error.details[0].message })

    try {
        const user = { ...req.body, password: JwtHelper.CreatePasswordHash(req.body.password) }
        await User.create(user)
        res.status(200).json({ message: "Kayıt Başarıyla Gerçekleşti" })
    } catch (error) {
        res.status(400).json({ message: "Kayıt başarısız", error })
    }
}

exports.Signin = async (req, res) => {
    const { error } = SigninValidator.validate(req.body)
    if (error)
        res.status(400).json({ message: error.details[0].message })

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user)
            res.status(404).json({ message: "Kullanıcı Bulunmadı" })

        if (!bcrypt.compareSync(password, user.password))  //Girilen parolayı, veritabanındaki hashlenmiş parola ile bcrypt 
            res.status(400).json({ message: "Şifre yanlış" }) // paketinin içinde bulunan compare metodu ile kontrol ediyoruz.

        const token = JwtHelper.CreateToken(user)
        res.status(200).json({ message: "Giriş başarılı", token })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



