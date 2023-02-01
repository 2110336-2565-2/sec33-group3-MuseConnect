const router = require('express').Router()

// controller functions
const {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controllers/adminController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// get an admin
router.get('/:id', getAdmin)

// create admin
router.post('/:id', createAdmin)

// update admin
router.put('/:id', updateAdmin)

// delete admin
router.delete('/:id', deleteAdmin)

module.exports = router