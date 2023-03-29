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

/**
* @swagger
* tags:
*   name: Portfolios
*   description: Portfolios managing API
*/
/**
* @swagger
* /portfolio:
*   get:
*       summary: Get all portfolios
*       tags: [Portfolios]
*       responses:
*           200:
*               description: The list of the portfolios
*           400:
*               description: Some error
*/
/**
* @swagger
* /portfolio/{id}:
*   get:
*     summary: Get the portfolio by id
*     tags: [Portfolios]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The portfolio id
*     responses:
*       200:
*         description: the portfolio description by id
*       400:
*         description: Some error
*       404:
*         description: The portfolio was not found
*/
/**
* @swagger
* /portfolio:
*   post:
*     summary: Create a portfolio
*     tags: [Portfolios]
*     requestBody:
*       required: true
*     responses:
*       201:
*         description: Create successfull
*       400:
*         description: Some error
*/
/**
* @swagger
* /portfolio/{id}:
*   put:
*     summary: Update the portfolio by id
*     tags: [Portfolios]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The portfolio id
*     requestBody:
*       required: true
*     responses:
*       200:
*         description: The portfolio was updated
*       400:
*         description: Some error
*       404:
*         description: The portfolio was not found 
*/
/**
* @swagger
* /portfolio/{id}:
*   delete:
*     summary: Remove the portfolio by id
*     tags: [Portfolios]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The portfolio id
*     responses:
*       200:
*         description: The portfolio was deleted
*       400:
*         description: Some error
*       404:
*         description: The portfolio was not found
*/

router.use(requireAuth)

// get portfolios
router.get('/', getPortfolios)

// get a portfolio
router.get('/musician/:id', getPortfolio)

// post portfolio
router.post('/:id', createPortfolio)

// put portfolio
router.put('/:id', updatePortfolio)

// delete portfolio
router.delete('/:id', deletePortfolio)

module.exports = router