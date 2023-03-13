const router = require("express").Router();

// controller functions
const {
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// upload user profile image
router.put("/upload/:id", uploadImage);

module.exports = router;
