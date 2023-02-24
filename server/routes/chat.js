const router = require("express").Router();

// controller functions
const { 
  fetchChats,
  accessChat,
  // createChat
} = require("../controllers/chatConntroller");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// access chat
router.post("/", accessChat);

// fetch chats
router.get("/", fetchChats)

// delete chat
// router.delete("/:id", deleteChat);

// // put chat
// router.put("/:id", updateUser);


module.exports = router
