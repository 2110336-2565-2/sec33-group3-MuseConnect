const router = require("express").Router();
const multer = require('multer')


// controller functions
const {
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// testing api
router.get("/check_c", (req, res) => {
  // console.log(req)
  res.json({ mess: "check cookies is work" });
});

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// upload user profile image
router.put("/upload/:id", uploadImage);

module.exports = router;
