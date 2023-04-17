const router = require("express").Router();
const auth = require("../middleware/auth");

// controller functions
const {
  getAllEvents,
  getUserEvents,
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
*         _id:
*           type: ObjectId
*           format: uuid
*           description: The auto-generated id of event
*           example: 64350c6b8b6aff4bc8c0f8b6
*         name:
*           type: String
*           description: The name of event
*         date:
*           type: Date
*           description: The date of event
*         location:
*           type: String
*           description: The location of event
*         organizer:
*           type: ObjectId
*           description: The id of organizer in this event
*         musician:
*           type: ObjectId
*           description: The id of musician in this event
*         detail:
*           type: ObjectId
*           description: The detail of event
*         status:
*           type: String
*           enum: ["ACCEPT", "DECLINE", "PENDING", "CANCELLED"]
*           description: The status of event
*         wage:
*           type: Number
*           minimum: 0
*           description: The wage musician will get
*         transaction_state:
*           type: String
*           enum: ["NOTACK", "EVEACK", "ORGPAID", "MUSACC", "CANCEL", "MUSREF", "TRNFIN"]
*           description: The status of event transaction
*         review_description:
*           type: String
*           description:  The review description of event
*         review_score:
*           type: Number
*           minimum: 0
*           maximum: 5
*           description: The review score of event
*       example:
*           _id: 642414ea16f1a5ce13e30f69
*           name: test_event
*           date: 2023-03-30T00:00:00.000+00:00
*           location: test_location
*           organizer: 6424116116f1a5ce13e30f22
*           musician: 6424112616f1a5ce13e30f1f
*           detail: test_detail
*           status: ACCEPT
*           wage: 123
*           transaction_state: TRNFIN
*           review_description: test_review
*           review_score: 5
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
*             description: The list of all events
*             content:
*               application/json:
*                 schema:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Event'
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
*             type: object
*             properties:
*               name:
*                 type: String
*                 example: test_event
*               date:
*                 type: Date
*                 example: 2023-03-30T00:00:00.000+00:00
*               location:
*                 type: String
*                 example: test_location
*               organizer:
*                 type: String
*                 example: 6424116116f1a5ce13e30f22
*               musician:
*                 type: String
*                 example: 6424112616f1a5ce13e30f1f
*               detail:
*                 type: String
*                 example: test_detail
*               status:
*                 type: String
*                 example: PENDING
*               wage:
*                 type: Number
*                 example: 123
*               transaction_state:
*                 type: String
*                 example: NOTACK
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
*     summary: Update the event by eventId or messageId
*     tags: [Events]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The event id or message id
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
*     responses:
*       200:
*         description: The event was deleted
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*       400:
*         description: Some error
*/

// fetech event
router.get("/", getAllEvents);

// get all the events of a musician
router.get("/user/:id", getUserEvents);

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
