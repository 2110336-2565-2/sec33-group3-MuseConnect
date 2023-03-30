const router = require("express").Router();
const auth = require("../middleware/auth");

// controller functions
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

/**
* @swagger
* components:
*   schemas:
*     Event:
*       type: object
*       required:
*         - name
*         - date
*         - location
*         - organizer
*         - musician
*       properties:
*         id:
*           type: ObjectId
*           format: uuid
*           description: The auto-generated id of event
*           example: d290f1ee-6c54-4b01-90e6-d701748f0851
*         name:
*           type: string
*           description: The name of event
*         date:
*           type: date
*           description: The date of event
*         location:
*           type: string
*           description: The location of event
*         organizer:
*           type: ObjectId
*           description: The id of organizer
*         musician:
*           type: ObjectId
*           description: The id of musician
*         detail:
*           type: ObjectId
*           description: The detail of event
*         status:
*           type: string
*           description: The status of event
*         wage:
*           type: number
*           description: The wage of musician
*       example:
*           id: 642414ea16f1a5ce13e30f69
*           name: test event
*           date: 2023-03-30T00:00:00.000+00:00
*           location: test_location
*           organizer: 6424116116f1a5ce13e30f22
*           musician: 6424112616f1a5ce13e30f1f
*           detail: test_detail
*           status: ACCEPT
*           wage: 123
*/
/**
* @swagger
* tags:
*   name: Events
*   description: Events managing API
*/
/**
* @swagger
* /event:
*   get:
*       summary: Get all events
*       tags: [Events]
*       responses:
*           200:
*               description: The list of all events
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Event'
*           400:
*               description: Some error
*/
/**
* @swagger
* /event/{id}:
*   get:
*     summary: Get the event by id
*     tags: [Events]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The event id
*     responses:
*       200:
*         description: the event description by id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Event'
*       400:
*         description: Some error
*       404:
*         description: The event was not found
*/
/**
* @swagger
* /event:
*   post:
*     summary: Create an event
*     tags: [Events]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Event'
*     responses:
*       201:
*         description: Create successfull
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*       400:
*         description: Some error
*/
/**
* @swagger
* /event/{id}:
*   put:
*     summary: Update the event by id
*     tags: [Events]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The event id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Event'
*     responses:
*       200:
*         description: The event was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*       400:
*         description: Some error
*       404:
*         description: The event was not found 
*/
/**
* @swagger
* /event/{id}:
*   delete:
*     summary: Remove the event by id
*     tags: [Events]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The event id
*
*     responses:
*       200:
*         description: The event was deleted
*       400:
*         description: Some error
*       404:
*         description: The event was not found
*/

// fetech event
router.get("/", getAllEvents);

// get single event
router.get("/:id", getEvent);

// only organizer can post, put and delete events
// router.use(auth.authorize('ORGANIZER'));

// post event
router.post("/", createEvent);

// put event
router.put("/:id", updateEvent);

// delete event
router.delete("/:id", deleteEvent);

module.exports = router;
