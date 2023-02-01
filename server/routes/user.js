const router = require('express').Router()

// controller functions
const {
    signupUser,
    loginUser,
    getUser,
    putUser,
    deleteUser
} = require('../controllers/userController')

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


//get route
router.get('/:id', getUser)

//put route
router.put('/:id', putUser)

//delete route
router.delete('/:id', deleteUser)

module.exports = router