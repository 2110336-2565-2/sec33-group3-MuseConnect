const router = require("express").Router();

// controller functions
const {
  getMusicians,
  getMusician,
} = require("../controllers/musicianController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// get musicians
router.get("/", getMusicians);

// get a musician
router.get("/:id", getMusician);

module.exports = router;
