const router = require("express").Router();

// controller functions
const { 
  allMessages,
  sendMessage,
} = require("../controllers/chatConntroller");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// fetech chats
router.get("/:chatId", allMessages)

// send message
router.post("/", sendMessage);


module.exports = router
