require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get a user
const getUser = async (req, res) => {
    res.status(200).json({success:true, msg:'Show a user'});
}

// edit a user
const putUser = async (req, res) => {
    res.status(200).json({success:true, msg:'edit a user'});
}

// delete a user
const deleteUser = async (req, res) => {
    res.status(200).json({success:true, msg:'delete a user'});
}
 
module.exports = {
    signupUser,
    loginUser,
    getUser,
    putUser,
    deleteUser
}