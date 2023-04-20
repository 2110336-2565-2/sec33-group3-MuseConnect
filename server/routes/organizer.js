const router = require("express").Router();

// controller functions
const {
  getOrganizers,
  getOrganizer,
} = require("../controllers/organizerController");
const requireAuth = require("../middleware/requireAuth");

/**
* @swagger
* tags:
*   name: Organizers
*   description: Organizers managing API
*/
/**
* @swagger
* /organizer:
*   get:
*       summary: Returns the list of all the organizers
*       security:              
*         - bearerAuth: [] 
*       tags: [Organizers]
*       parameters:
*         - in: query
*           name: p
*           schema:
*             type: Number
*             required: false
*             description: The page number of organizer list
*         - in: query
*           name: m
*           schema:
*             type: Number
*             required: false
*             description: The max number of organizer in page
*       responses:
*           200:
*               description: The list of the organizers
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
* /organizer/{id}:
*   get:
*     summary: Get the organizer by id
*     security:              
*       - bearerAuth: [] 
*     tags: [Organizers]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The organizer id
*     responses:
*       200:
*         description: the organizer description by id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: Some error
*/

router.use(requireAuth)

// get organizers
router.get("/", getOrganizers);

// get an organizer
router.get("/:id", getOrganizer);

module.exports = router;
