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

// get musicians
router.get('/', getMusicians)

// get a musician
router.get('/:id', getMusician)

// create musician
router.post('/', createMusician)

// update musician
router.put('/:id', updateMusician)

// delete musician
router.delete('/:id', deleteMusician)

module.exports = router