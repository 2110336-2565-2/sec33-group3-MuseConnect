const router = require("express").Router();

// controller functions
const { 
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

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
*         id:
*           type: ObjectId
*           format: uuid
*           description: The auto-generated id of message
*           example: d290f1ee-6c54-4b01-90e6-d701748f0851
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
*               description: The event in message
*         chat:
*           type: ObjectId
*           description: The chat where this message in
*       example:
*           id: 63fa509243b30b769e2ba35
*           sender: 63de6589f2a20731c8d6a879
*           content: 
*             properties:
*               text: hello
*               event: 642414ea16f1a5ce13e30f69
*           chat: 642412f14c1bdfa91d8cb65a
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
*       404:
*         description: The chat was not found
*/
/**
* @swagger
* /message:
*   post:
*     summary: send message
*     tags: [Messages]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Message'
*     responses:
*       201:
*         description: Access successfull
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Message'
*       400:
*         description: Some error
*/

// fetech chats
router.get("/:chatId", allMessages)

// send message
router.post("/", sendMessage);

module.exports = router
