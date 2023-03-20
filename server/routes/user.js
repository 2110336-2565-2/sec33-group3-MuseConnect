const router = require("express").Router();

// controller functions
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");

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
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of user
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         ลําดับ:
 *           type: string
 *           description: Ordinal number
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         first_name:
 *           type: string
 *           description: User first name
 *         last_name:
 *           type: string
 *           description: User last name
 *         phone_number:
 *           type: string
 *           description: User phone number
 *         role:
 *           type: string
 *           description: User role
 *         specialization:
 *           type: string
 *           description: User specialization
 *         price_min:
 *           type: number
 *           description: User minimum price
 *         price_max:
 *           type: number
 *           description: User maximum price
 *         status:
 *           type: string
 *           description: User status
 *         location:
 *           type: string
 *           description: User location
 *         wage:
 *           type: number
 *           description: User wage
 *         description:
 *           type: string
 *           description: User description
 *         link:
 *           type: string
 *           description: User link
 *       example:
 *           id: 609bda561452242d88d36e37
 *           ลําดับ: 123
 *           email: user1@test.com
 *           password: Tester123!
 *           first_name: ผู้ใช้
 *           last_name: ทดสอบ
 *           phone_number: 0234567891
 *           role: musician
 *           region: กรุงเทพมหานคร (Bangkok)
 *           price_min: 0
 *           price_max: 100000
 *           status: AVAILABLE
 *           location: กรุงเทพฯ
 *           wage: 20000
 *           description: none
 *           link: none
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
 *     summary: Update the user by the id
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
 *         description: Some error
 *       404:
 *         description: |
 *            - The user was not found
 *            - The user was invalid
 *       500:
 *         description: Some error happened
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

router.use(requireAuth);

// get user
router.get("/:id", getUser);

// put user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
