const User = require('../models/user')
const { infoLogger, errorLogger } = require('../config/winston')

const block = async (req, res) => {
    const { currentusername, blockusername } = req.body

    if (!!req.body.currentusername && !!req.body.blockusername) {
        try {
            const currentUser =  await User.findOne({ 'username': currentusername })
            const blockUser =  await User.findOne({ 'username': blockusername })
    
            if (blockUser) {
                currentUser.blocked.push(blockUser.username)
    
                User.findByIdAndUpdate(currentUser._id, currentUser)
                    .then((result) => {
                        res.status(200).json({
                            'Status': '200',
                            'Status Message': `${blockusername} was blocked with success`
                        })
                        infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                    })
                    .catch((err) => {
                        res.status(500).json({
                            'Status': '500',
                            'Status Message': `${blockusername} was not blocked`
                        })
                        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
                    })
    
            } else {
                res.status(404).json({
                    'Status': '404',
                    'Status Message': 'User Not Found'
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
    } else {
        res.status(404).json({
            'Status': '404',
            'Status Message': 'Not Found'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Failed - ${req.originalUrl} - ${req.ip}`)
    }
}

const unblock = async (req, res) => {
    const { currentusername, unblockusername } = req.body

    if (!!req.body.currentusername && !!req.body.unblockusername) {
        try {
            const currentUser = await User.findOne({ 'username': currentusername })
            const blockedUser = await User.findOne({ 'username': unblockusername })
    
            if (currentUser.blocked.includes(unblockusername) && !!req.body.currentusername && !!req.body.unblockusername) {
                
                currentUser.blocked.forEach((element, index) => {
                    if (element === blockedUser.username) {
                        currentUser.blocked.splice(index, 1);
                    }
                });
    
                User.findByIdAndUpdate(currentUser._id, currentUser)
                    .then((result) => {
                        res.status(200).json({
                            'Status': '200',
                            'Status Message': `${unblockusername} was unblocked with success`
                        })
                        infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                    })
                    .catch((err) => {
                        res.status(500).json({
                            'Status': '500',
                            'Status Message': `${unblockusername} was not unblocked`
                        })
                        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
                    })
    
            } else {
                res.status(404).json({
                    'Status': '404',
                    'Status Message': 'User Not Found'
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
    } else {
        res.status(404).json({
            'Status': '404',
            'Status Message': 'Not Found'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Failed  - ${req.originalUrl} - ${req.ip}`)
    }
}

const listBlockedUsers = async (req, res) => {
    const { username } = req.body

    try {
        const currentUser = await User.findOne({ 'username': username })

        if (currentUser) {
            res.status(200).json({
                'blockedUsers': currentUser.blocked
            })
            infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)

        } else {
            res.status(404).json({
                'Status': '404',
                'Status Message': 'User Not Found'
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

module.exports = {
    block,
    unblock,
    listBlockedUsers
}