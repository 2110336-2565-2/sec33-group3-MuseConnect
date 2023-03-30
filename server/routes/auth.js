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
* /auth/signup:
*   post:
*     summary: Sign up a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: The user was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Some error
*/
/**
* @swagger
* /auth/login:
*   post:
*     summary: Log in a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: The user successfully logged in
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Some error
*/


// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
