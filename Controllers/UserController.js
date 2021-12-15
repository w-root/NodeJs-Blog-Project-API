const User = require('../Models/User')

exports.GetUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}



exports.UpdateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, { ...req.body })
        res.status(200).json({ message: "Veriler güncellendi" })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.id)
        res.status(200).json({ message: "Hesap Silindi !" })
    } catch (error) {
        res.status(400).json(error)
    }
}