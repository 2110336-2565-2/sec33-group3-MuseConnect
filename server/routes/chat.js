const router = require("express").Router();

// controller functions
const { 
  fetchChats,
  accessChat,
  // createChat
} = require("../controllers/chatConntroller");

// TODO uncomment this in production
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// access chat
router.post("/", accessChat);

// fetech chats
router.get("/", fetchChats)

// post chat
// router.post("/", createChat);

// delete chat
// router.delete("/:id", deleteChat);

// // put chat
// router.put("/:id", updateUser);


module.exports = router
