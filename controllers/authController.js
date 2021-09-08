const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { infoLogger, errorLogger } = require('../config/winston')

const expiresDate = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({id}, 'ArmutCase', {expiresIn: expiresDate})
}

const login_post = async (req, res) => {
    const { username, password } = req.body

    if (!!req.body.username && !!req.body.password) {
        try {
            const user = await User.login(username, password)
            const token = createToken(user._id)
            res.cookie('ArmutCaseToken', token, {httpOnly: true, maxAge: expiresDate * 1000})
            res.status(200).json({
                'Status': '200',
                'Status Message': 'Login With Success'
            })
            infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
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
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Not Found  - ${req.originalUrl} - ${req.ip}`)
    }
    
}

const signup_post = (req, res) => {
    const user = new User(req.body)

    if (!!req.body.email && !!req.body.username && !!req.body.password) {
        user.save()
            .then((result) => {
                res.status(201).json({
                    'Status': '201',
                    'Status Message': 'Account is created'
                })
                infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
            })
            .catch((err) => {
                res.status(401).json({
                    'Status': '401',
                    'Status Message': 'Unauthorized'
                })
                errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err}  - ${req.originalUrl} - ${req.ip}`)
            })
    } else {
        res.status(401).json({
            'Status': '401',
            'Status Message': 'Unauthorized'
        })
        errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - Unauthorized  - ${req.originalUrl} - ${req.ip}`)
    }
}

const logout_get = (req, res) => {
    res.cookie('ArmutCaseToken', '', {maxAge: 1})
    res.status(200).json({
        'Status': '200',
        'Status Message': 'Logged out With Success'
    })
    infoLogger.info(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - 'Success' - ${req.originalUrl} - ${req.ip}`)
}

module.exports = {
    login_post,
    signup_post,
    logout_get
}