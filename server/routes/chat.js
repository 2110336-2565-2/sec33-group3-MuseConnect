const router = require("express").Router();

// controller functions
const { 
  fetchChats,
  accessChat,
  getChat,
  deleteChat,
  updateChat
  // createChat
} = require("../controllers/chatConntroller");

const requireAuth = require('../middleware/requireAuth')

/**
* @swagger
* components:
*   schemas:
*     Chat:
*       type: object
*       required:
*         - organizer
*         - musician
*       properties:
*         id:
*           type: ObjectId
*           format: uuid
*           description: The auto-generated id of chat
*           example: d290f1ee-6c54-4b01-90e6-d701748f0851
*         organizer:
*           type: ObjectId
*           description: The id of organizer
*         musician:
*           type: ObjectId
*           description: The id of musician
*         latestMessage:
*           type: ObjectId
*           description: The id of lastest message
*         latestMessageEvent:
*           type: ObjectId
*           description: The id of lastest message event
*       example:
*           id: 63fa509243b30b769e2ba35
*           organizer: 63de6589f2a20731c8d6a879
*           musician: 63e8d9bf491bf69c080bbee
*           latestMessage: 641c58c7e96c4fcd0f10b948
*           latestMessageEvent: 640fd1b3f363a1d188909564
*/
/**
* @swagger
* tags:
*   name: Chats
*   description: Chats managing API
*/
/**
* @swagger
* /chat:
*   post:
*     summary: Access chat
*     tags: [Chats]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Chat'
*     responses:
*       201:
*         description: Access successfull
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Chat'
*       400:
*         description: Some error
*/
/**
* @swagger
* /chat:
*   get:
*       summary: Fetch chats
*       tags: [Chats]
*       responses:
*           200:
*               description: The list of the chats
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Chat'
*           400:
*               description: Some error
*/
/**
* @swagger
* /chat/{id}:
*   get:
*     summary: Get the chat by id
*     tags: [Chats]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The chat id
*     responses:
*       200:
*         description: the chat description by id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Chat'
*       400:
*         description: Some error
*       404:
*         description: The chat was not found
*/
/**
* @swagger
* /chat/{id}:
*   put:
*     summary: Update the chat by id
*     tags: [Chats]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The chat id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Chat'
*     responses:
*       200:
*         description: The chat was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Chat'
*       400:
*         description: Some error
*       404:
*         description: The chat was not found 
*/
/**
* @swagger
* /chat/{id}:
*   delete:
*     summary: Remove the chat by id
*     tags: [Chats]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The chat id
*
*     responses:
*       200:
*         description: The chat was deleted
*       400:
*         description: Some error
*       404:
*         description: The chat was not found
*/

router.use(requireAuth)

// access chat
router.post("/", accessChat);

// fetch chats
router.get("/", fetchChats)

// get chat
router.get("/:id", getChat)

// delete chat
router.delete("/:id", deleteChat);

// // put chat
router.put("/:id", updateChat);


module.exports = router
