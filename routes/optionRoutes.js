const router = require('express').Router()
const optionController = require('../controllers/optionController')

/**
 * @swagger
 * /block:
 *   post:
 *     description: Block other users by username
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - currentusername
 *             - blockusername
 *           properties:
 *             currentusername:
 *               type: string
 *             blockusername:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error
 */
router.post('/block', optionController.block)

/**
 * @swagger
 * /unblock:
 *   post:
 *     description: Unblock other users by username
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - currentusername
 *             - unblockusername
 *           properties:
 *             currentusername:
 *               type: string
 *             unblockusername:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error
 */
router.post('/unblock', optionController.unblock)

/**
 * @swagger
 * /listblockedusers:
 *   get:
 *     description: List blocked users
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - username
 *           properties:
 *             username:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get('/listblockedusers', optionController.listBlockedUsers)

module.exports = router