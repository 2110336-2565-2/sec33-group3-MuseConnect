const router = require('express').Router()

// controller functions
const {
    signupUser,
    loginUser
} = require('../controllers/userController')

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router