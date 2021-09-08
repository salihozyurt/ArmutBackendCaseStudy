const User = require('../models/user')
const Message = require('../models/message')
const { infoLogger, errorLogger } = require('../config/winston')

const sendMessage = async (req, res) => {
    const message = new Message(req.body)

    try {
        const currentUser = await User.findOne({ 'username': req.body.fromUserName })
        const sentUser = await User.findOne({ 'username': req.body.toUserName })

        if (sentUser && !sentUser.blocked.includes(currentUser.username)) {
            message.save()
                .then((result) => {
                    res.status(200).json({
                        'Status': '200',
                        'Status Message': 'Message was sent with success'
                    })
                    infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                })
                .catch((err) => {
                    res.status(500).json({
                        'Status': '500',
                        'Status Message': 'Message was not sent'
                    })
                    errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
                })
        } else {
            res.status(404).json({
                'Status': '404',
                'Status Message': 'User Not Found or User Blocked You'
            })
            errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${error}  - ${req.originalUrl} - ${req.ip}`)
        }
    } catch (error) {
        res.status(404).json({
            'Status': '404',
            'Status Message': 'Not Found'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${error}  - ${req.originalUrl} - ${req.ip}`)
    }
}

const getMessages = async (req, res) => {
    try {
        const currentUser = await User.findOne({ 'username': req.body.username })
        const messages = await Message.find({ 'toUserName': req.body.username })
        let clearMessages = []

        messages.forEach((element) => {
            if (!currentUser.blocked.includes(element.fromUserName)) {
                let clearMessage = {
                    'fromUserName': element.fromUserName,
                    'message': element.message,
                    'sentTime': element.createdAt.toISOString().split('T')[0] + ' ' + element.createdAt.toISOString().split('T')[1].split('.')[0] 
                }
                clearMessages.push(clearMessage)
            }
        });
        res.status(200).json({
            'messages': clearMessages
        })
        infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
    } catch (error) {
        res.status(404).json({
            'Status': '404',
            'Status Message': 'Not Found'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${error}  - ${req.originalUrl} - ${req.ip}`)
    }
}

module.exports = {
    sendMessage,
    getMessages
}