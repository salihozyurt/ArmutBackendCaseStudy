const router = require('express').Router()
const messageController = require('../controllers/messageController')

/**
 * @swagger
 * /sendmessage:
 *   post:
 *     description: Send message to other user by usernames
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - fromUserName
 *             - toUserName
 *             - message
 *           properties:
 *             fromUserName:
 *               type: string
 *             toUserName:
 *               type: string
 *             message:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error
 */
router.post('/sendmessage', messageController.sendMessage)

/**
 * @swagger
 * /getmessages:
 *   get:
 *     description: Get all messages which specified by username
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
router.get('/getmessages', messageController.getMessages)

module.exports = router