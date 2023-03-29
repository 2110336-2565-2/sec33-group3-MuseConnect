const router = require("express").Router();

// controller functions
const {
  fetchChats,
  accessChat,
  getChat,
  deleteChat,
  updateChat,
  // createChat
} = require("../controllers/chatConntroller");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// access chat
router.post("/", accessChat);

// fetch chats
router.get("/", fetchChats);

// get chat
router.get("/:id", getChat);

// delete chat
router.delete("/:id", deleteChat);

// update chat
router.put("/:id", updateChat);

module.exports = router;
