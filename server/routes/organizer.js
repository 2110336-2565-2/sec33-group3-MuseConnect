const router = require('express').Router()

// controller functions
const {
    getOrganizers,
    getOrganizer,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
} = require('../controllers/organizerController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// get organizers
router.get('/', getOrganizers)

// get an organizer
router.get('/:id', getOrganizer)

// create organizer
router.post('/', createOrganizer)

// update organizer
router.put('/:id', updateOrganizer)

// delete organizer
router.delete('/:id', deleteOrganizer)

module.exports = router