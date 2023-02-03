const router = require("express").Router();

// controller functions
const {
  signupUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// GET all users
router.get("/", (req, res) => {
  res.json({ mssg: "GET all users" });
});

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
