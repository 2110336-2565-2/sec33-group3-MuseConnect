const router = require("express").Router();

// controller functions
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

/**
* @swagger
* components:
*   schemas:
*     Message:
*       type: object
*       required:
*         - sender
*         - chat
*       properties:
*         _id:
*           type: ObjectId
*           format: uuid
*           description: The auto-generated id of message
*           example: 64350c6b8b6aff4bc8c0f8b6
*         sender:
*           type: ObjectId
*           description: The id of sender
*         content:
*           properties:
*             text:
*               type: String
*               description: The text of message
*             event:
*               type: ObjectId
*               description: The id of event in message
*         chat:
*           type: ObjectId
*           description: The chat where this message is
*       example:
*           - _id: 63fa509243b30b769e2ba35
*             sender: 63de6589f2a20731c8d6a879
*             content: 
*               text: hello
*             chat: 642412f14c1bdfa91d8cb65a
*           - _id: 63fa509243b30b769e2ba39
*             sender: 63de6589f2a20731c8d6a879
*             content: 
*               event: 642414ea16f1a5ce13e30f69
*             chat: 642412f14c1bdfa91d8cb65a
*/
/**
* @swagger
* tags:
*   name: Messages
*   description: Messages managing API
*/
/**
* @swagger
* /message/{ChatId}:
*   get:
*     summary: Get all messages by chat id
*     tags: [Messages]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The chat id
*     responses:
*       200:
*         description: All messages in the chat
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Message'
*       400:
*         description: Some error
*/
/**
* @swagger
* /message:
*   post:
*     summary: Send a message
*     tags: [Messages]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               content:
*                 type: Object
*                 example: {text : "test_message"}
*               chatId:
*                 type: String
*                 example: 642412f14c1bdfa91d8cb65a
*     responses:
*       201:
*         description: Access successfull
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: ObjectId
*                   example: 64350c6b8b6aff4bc8c0f8b6
*                 sender:
*                   type: ObjectId
*                 content:
*                   type: Object
*                   example: {text : "test_message"}
*                 chat:
*                   type: ObjectId
*                   example: 642412f14c1bdfa91d8cb65a
*       400:
*         description: Some error
*/

// fetech chats
router.get("/:chatId", allMessages);

// send message
router.post("/", sendMessage);

module.exports = router;
