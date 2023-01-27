const router = require('express').Router()

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

module.exports = router