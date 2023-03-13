const router = require('express').Router()

// controller functions
const {
    getMusicians,
    getMusician,
} = require('../controllers/musicianController')
const requireAuth = require('../middleware/requireAuth')



// get musicians
router.get('/', getMusicians)

// authentication
router.use(requireAuth)

// get a musician
router.get('/:id', getMusician)

module.exports = router