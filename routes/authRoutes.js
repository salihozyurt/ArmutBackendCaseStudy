const router = require('express').Router()
const authController = require('../controllers/authController')

/**
 * @swagger
 * /login:
 *   post:
 *     description: Authenticate and login user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
router.post('/login', authController.login_post)

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Create and signup new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - username
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
router.post('/signup', authController.signup_post)

/**
 * @swagger
 * /logout:
 *   get:
 *     description: Authenticate and logout user
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/logout', authController.logout_get)

module.exports = router