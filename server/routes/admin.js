const router = require("express").Router();

// controller functions
const { getAdmin } = require("../controllers/adminController");
const requireAuth = require("../middleware/requireAuth");
const auth = require("../middleware/auth");

router.use(requireAuth);
router.use(auth.authorize('ADMIN'));
    

// TODO delete when finish testing authorize
router.get("/", (req, res) => {
    res.json({ mess: "This is only for admin!" });
});

// get an admin
router.get("/:id", getAdmin);

module.exports = router;
