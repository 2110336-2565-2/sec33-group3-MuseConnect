const router = require('express').Router()

// controller functions
const {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controllers/adminController')


// get route
router.get('/:id', getAdmin)

// create route
router.post('/:id', createAdmin)

//update route
router.put('/:id', updateAdmin)

//delete route
router.delete('/:id', deleteAdmin)

module.exports = router