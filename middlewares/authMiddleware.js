const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { infoLogger, errorLogger }  = require('../config/winston')

const requireAuth = (req, res, next) => {
    const token = req.cookies.ArmutCaseToken

    if (token) {
        jwt.verify(token, 'ArmutCase', (err, decodedToken) =>{
            if (err) {
                res.status(409).json({
                    'Status': '401',
                    'Status Message': 'User not verified'
                })
                errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
            } else {
                res.status(200).json({
                    'Status': '200',
                    'Status Message': 'User verified'
                })
                infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                next()
            }
        })
    } else {
        res.status(409).json({
            'Status': '401',
            'Status Message': 'Token not found'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Token not found  - ${req.originalUrl} - ${req.ip}`)
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.ArmutCaseToken

    if (token) {
        jwt.verify(token, 'ArmutCase', async (err, decodedToken) =>{
            if (err) {
                res.locals.user = null
                res.status(409).json({
                    'Status': '401',
                    'Status Message': 'User not verified'
                })
                errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
            } else {
                infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.status(409).json({
            'Status': '401',
            'Status Message': 'Token not found'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Token not found  - ${req.originalUrl} - ${req.ip}`)
        next()
    }
}

module.exports = { 
    requireAuth, 
    checkUser 
}