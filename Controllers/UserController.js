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
        const user = await User.findByIdAndUpdate(req.body.id, { ...req.body })
        res.status(200).json({ message: "veriler güncellendi" })
    } catch (error) {
        res.status(400).json(error)
    }
}