const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { infoLogger, errorLogger }  = require('../config/winston')

const requireAuth = (req, res, next) => {
    const token = req.cookies.ArmutCaseToken

    if (token) {
        jwt.verify(token, 'ArmutCase', (err, decodedToken) =>{
            if (err) {
                errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
            } else {
                infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                next()
            }
        })
    } else {
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Token not found  - ${req.originalUrl} - ${req.ip}`)
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.ArmutCaseToken

    if (token) {
        jwt.verify(token, 'ArmutCase', async (err, decodedToken) =>{
            if (err) {
                res.locals.user = null
                errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
            } else {
                infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Token not found  - ${req.originalUrl} - ${req.ip}`)
        next()
    }
}

module.exports = { 
    requireAuth, 
    checkUser 
}