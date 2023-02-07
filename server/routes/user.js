const router = require("express").Router();

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

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router
