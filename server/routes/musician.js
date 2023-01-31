const router = require('express').Router()

// controller functions
const {
    getMusicians,
    getMusician,
    createMusician,
    updateMusician,
    deleteMusician
} = require('../controllers/musicianController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// get route
router.get('/', getMusicians)

// get routes
router.get('/:id', getMusician)

// create route
router.post('/', createMusician)

//update route
router.put('/:id', updateMusician)

//delete route
router.delete('/:id', deleteMusician)

module.exports = router