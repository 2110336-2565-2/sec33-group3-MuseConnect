const router = require("express").Router();
const urouter = require("express").Router();

// controller functions
const {
  signupUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// default for urouters
urouter.get("/", (req, res) => {
  res.json({ mssg: "Urouter default" });
});
// login route
urouter.post("/login", loginUser);

// signup route
urouter.post("/signup", signupUser);

// GET all users
router.get("/", (req, res) => {
  res.json({ mssg: "GET all users" });
});

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = {
  router,
  urouter
}
