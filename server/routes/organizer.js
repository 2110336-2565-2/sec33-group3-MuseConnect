const router = require('express').Router()

// controller functions
const {
    getOrganizers,
    getOrganizer,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
} = require('../controllers/organizerController')


// get route
router.get('/:id', getOrganizers)

// get routes
router.get('/:id', getOrganizer)

// create route
router.post('/', createOrganizer)

//update route
router.put('/:id', updateOrganizer)

//delete route
router.delete('/:id', deleteOrganizer)

module.exports = router