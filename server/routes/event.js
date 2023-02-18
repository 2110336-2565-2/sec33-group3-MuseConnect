const router = require("express").Router();
const auth = require("../middleware/auth");

// controller functions
const { 
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// fetech event
router.get("/", getAllEvents)

// get single event
router.get("/:id", getEvent);

// only organizer can post, put and delete events
router.use(auth.authorize('ORGANIZER'));

// post portfolio
router.post('/', createEvent)

// put portfolio
router.put('/:id', updateEvent)

// delete portfolio
router.delete('/:id', deleteEvent)


module.exports = router

