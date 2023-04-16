const router = require("express").Router();

// controller functions
const { getAdmin } = require("../controllers/adminController");
const requireAuth = require("../middleware/requireAuth");
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admins managing API
 */
/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get the admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: the admin description by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Some error
 */

router.use(requireAuth);
router.use(auth.authorize("ADMIN"));

// get an admin
router.get("/:id", getAdmin);

module.exports = router;
