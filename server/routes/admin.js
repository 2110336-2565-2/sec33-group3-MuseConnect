const router = require("express").Router();

// controller functions
const { getAdmin } = require("../controllers/adminController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// get an admin
router.get("/:id", getAdmin);

module.exports = router;
