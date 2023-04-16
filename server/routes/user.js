const router = require("express").Router();

// controller functions
const {
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
} = require("../controllers/userController");

const requireAuth = require('../middleware/requireAuth')

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - password
*         - first_name
*         - last_name
*         - phone_number
*         - role
*       properties:
*         id:
*           type: String
*           format: uuid
*           description: The auto-generated id of user
*           example: 64350c6b8b6aff4bc8c0f8b6
*         email:
*           type: String
*           description: User email
*         password:
*           type: String
*           description: User password
*         first_name:
*           type: String
*           description: User first name
*         last_name:
*           type: String
*           description: User last name
*         phone_number:
*           type: String
*           description: User phone number
*         role:
*           type: String
*           enum: ["ADMIN", "MUSICIAN", "ORGANIZER"]
*           description: User role
*         profile_picture:
*           properties:
*             data:
*               type: Buffer
*               description: picture string convert to bindata
*             contentType:
*               type: String
*               description: type of picture
*           description: User profile picture
*         specialization:
*           type: [String]
*           description: Musician specialization
*         price_min:
*           type: Number
*           minimum: 0
*           description: User minimum wanted price
*         price_max:
*           type: Number
*           minimum: 0
*           description: User maximum wanted price
*         status:
*           type: String
*           enum: ["BUSY", "AVAILABLE"]
*           description: User status
*         location:
*           type: String
*           description: User location
*         preference:
*           type: [String]
*           description: Organizer preference
*         wage:
*           type: Number
*           minimum: 0
*           description: User wage
*         description:
*           type: String
*           description: User description
*         link:
*           type: String
*           description: User link
*       example:
*           id: 609bda561452242d88d36e37
*           email: user1@test.com
*           password: Tester123!
*           first_name: ผู้ใช้
*           last_name: ทดสอบ
*           phone_number: "+66111111111"
*           role: MUSICIAN
*           profile_picture:
*             data: BinData(0, 'ZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNEFBUVNrWkpSZ0FCQVFFQVlBQmdBQUQvMndCREFBWUVCQVVFQkFZRkJRVUdCZ1lI…')
*             contentType: "image/png"
*           specialization: ["metal"]
*           price_min: 0
*           price_max: 100000
*           status: AVAILABLE
*           location: กรุงเทพฯ
*           preference: ["pop"]
*           wage: 20000
*           description: test description
*           link: https://www.youtube.com/
*/
/**
* @swagger
* tags:
*   name: Users
*   description: Users managing API
*/
/**
* @swagger
* /user/{id}:
*   get:
*     summary: Get the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: the user description by id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: Some error
*       404:
*         description: The user was not found
*/
/**
* @swagger
* /user/{id}:
*   put:
*     summary: Update the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The user was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: |
*             - The user was invalid
*             - Some error
*       404:
*         description: The user was not found 
*/
/**
* @swagger
* /user/{id}:
*   delete:
*     summary: Remove the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*
*     responses:
*       200:
*         description: The user was deleted
*       400:
*         description: Some error
*       404:
*         description: The user was not found
*/

router.use(requireAuth)

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// upload user profile image
router.put("/upload/:id", uploadImage);

module.exports = router;
