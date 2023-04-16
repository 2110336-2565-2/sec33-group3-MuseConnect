const router = require("express").Router();

// controller functions
const { signupUser, loginUser } = require("../controllers/userController");

/**
* @swagger
* tags:
*   name: Auth
*   description: Authentication managing API
*/
/**
* @swagger
* /signup:
*   post:
*     summary: Sign up a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: String
*                 example : user1@test.com
*               password:
*                 type: String
*                 example : Password@1
*               first_name:
*                 type: String
*                 example : first_name
*               last_name:
*                 type: String
*                 example : last_name
*               phone_number:
*                 type: String
*                 example : "+66111111111"
*               role:
*                 type: String
*                 example : MUSICIAN
*     responses:
*       201:
*         description: The user was successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: String
*                   example : 643bccbdaf9e285cf555b4fk
*                 email:
*                   type: String
*                   example : user1@test.com
*                 token:
*                   type: String
*                   example : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2JjY2JkYWY5ZTI4NWNmNTU1YjRmZSIsImlhdCI6MTY4MTY0MDYzNywiZXhwIjoxNjg0MjMyNjM3fQ.bvh_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*       400:
*         description: Some error
*/
/**
* @swagger
* /login:
*   post:
*     summary: Log in a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: String
*                 example : musician1@hotmail.com
*               password:
*                 type: String
*                 example : Password@1
*     responses:
*       201:
*         description: The user successfully logged in
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: String
*                   example : 643bccbdaf9e285cf555b4fk
*                 email:
*                   type: String
*                   example : user1@test.com
*                 token:
*                   type: String
*                   example : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2JjY2JkYWY5ZTI4NWNmNTU1YjRmZSIsImlhdCI6MTY4MTY0MDYzNywiZXhwIjoxNjg0MjMyNjM3fQ.bvh_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*       400:
*         description: Some error
*/


// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
