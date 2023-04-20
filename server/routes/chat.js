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
*           example: 64350c6b8b6aff4bc8c0f8b6
*         organizer:
*           type: ObjectId
*           description: The id of organizer in this chat
*         musician:
*           type: ObjectId
*           description: The id of musician in this chat
*         createdAt:
*           type: Date
*           description: The created date of chat
*         updateAt:
*           type: Date
*           description: The lastest updated date of chat
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
*           createdAt: 2023-03-29T10:29:05.185+00:00
*           updateAt: 2023-04-04T01:54:43.286+00:00
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
*     summary: if existed get chat, else create new chat
*     security:              
*       - bearerAuth: [] 
*     tags: [Chats]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userId:
*                 type: String
*                 example: 63e8da0e491bf69c080bbef1
*     responses:
*       201:
*         description: Access successfully
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
*       summary: Get all chats related to user
*       security:              
*         - bearerAuth: [] 
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
*     security:              
*       - bearerAuth: [] 
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
*/
/**
* @swagger
* /chat/{id}:
*   put:
*     summary: Update the chat by id
*     security:              
*       - bearerAuth: [] 
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
*             type: object
*             properties:
*               organizer:
*                 type: String
*                 example: 63e8da0e491bf69c080bbef6
*               musician:
*                 type: String
*                 example: 63e8da0e491bf69c080bbef5
*               latestMessage:
*                 type: String
*                 example: 12e8da0e491bf69c080bbef1
*               latestMessageEvent:
*                 type: String
*                 example: 63e8da01111bf69c080bbef1
*     responses:
*       200:
*         description: The chat was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Chat'
*       400:
*         description: Some error
*/
/**
* @swagger
* /chat/{id}:
*   delete:
*     summary: Remove the chat by id
*     security:              
*       - bearerAuth: [] 
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
*         description: The chat was deleted
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Chat'
*       400:
*         description: Some error
*/

router.use(requireAuth)

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
