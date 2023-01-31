const router = require('express').Router()

// controller functions
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} = require('../controllers/portfolioController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// get M route
router.get('/', getPortfolios)

// get route
router.get('/musician/:id', getPortfolio)

// post route
router.post('/:id', createPortfolio)

//put route
router.put('/:id', updatePortfolio)

//delete route
router.delete('/:id', deletePortfolio)

module.exports = router