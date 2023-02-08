const router = require("express").Router();

// controller functions
const { 
  getChat,
  createChat
} = require("../controllers/chatConntroller");

// TODO uncomment this in production
// const requireAuth = require('../middleware/requireAuth')
// router.use(requireAuth)

// get chat
router.get("/", getChat);

// post chat
router.post("/", createChat);

// delete chat
// router.delete("/:id", deleteChat);

// // put chat
// router.put("/:id", updateUser);


module.exports = router
