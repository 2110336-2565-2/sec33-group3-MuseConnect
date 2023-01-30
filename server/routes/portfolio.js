const router = require('express').Router()

// controller functions
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} = require('../controllers/portfolioController')

// get M route
router.get('/:id', getPortfolios)

// get route
router.get('/musician/:id', getPortfolio)

// post route
router.post('/:id', createPortfolio)

//put route
router.put('/:id', updatePortfolio)

//delete route
router.delete('/:id', deletePortfolio)

module.exports = router