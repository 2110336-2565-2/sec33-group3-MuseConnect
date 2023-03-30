const router = require("express").Router();

// controller functions
const {
    getMusicians,
    getMusician,
} = require('../controllers/musicianController')
const requireAuth = require('../middleware/requireAuth')

/**
* @swagger
* tags:
*   name: Musicians
*   description: Musicians managing API
*/
/**
* @swagger
* /musician:
*   get:
*       summary: Returns the list of all the musicians
*       tags: [Musicians]
*       responses:
*           200:
*               description: The list of the musicians
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/User'
*           400:
*               description: Some error
*/
/**
* @swagger
* /musician/{id}:
*   get:
*     summary: Get the musician by id
*     tags: [Musicians]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The musician id
*     responses:
*       200:
*         description: the musician description by id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: Some error
*       404:
*         description: The musician was not found
*/

// get musicians
router.get("/", getMusicians);

// authentication
router.use(requireAuth);

// get a musician
router.get("/:id", getMusician);

module.exports = router;
