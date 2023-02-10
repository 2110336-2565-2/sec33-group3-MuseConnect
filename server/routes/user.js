const router = require("express").Router();

// controller functions
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// testing api
router.get("/check_c",(req,res)=>{
  // console.log(req)
  res.json({ mess: "check cookies is work" });
})

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);


module.exports = router
