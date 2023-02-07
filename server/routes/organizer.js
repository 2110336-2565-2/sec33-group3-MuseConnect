const router = require('express').Router()

// controller functions
const {
    getOrganizers,
    getOrganizer,
} = require('../controllers/organizerController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// get organizers
router.get('/', getOrganizers)

// get an organizer
router.get('/:id', getOrganizer)

module.exports = router