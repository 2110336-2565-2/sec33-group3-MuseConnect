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
*       tags: [Organizers]
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
*       404:
*         description: The organizer was not found
*/

router.use(requireAuth)

// get organizers
router.get("/", getOrganizers);

// get an organizer
router.get("/:id", getOrganizer);

module.exports = router;
