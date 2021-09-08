const express = require('express')
const morgan = require('morgan')
const { infoLogger, errorLogger } = require('./config/winston')
const swaggerDocs = require('./config/swagger')
const swaggerUi = require('swagger-ui-express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const optionRoutes = require('./routes/optionRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

const app = express()

//'mongodb://mongo:27017/ArmutCase?retryWrites=true&w=majority'
const dbURL = 'mongodb+srv://adminsalih:passsalih@armutcase.wdhmz.mongodb.net/ArmutCase?retryWrites=true&w=majority'

if (process.env.NODE_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose
    const mockgoose = new  Mockgoose(mongoose)

    mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true })
                .then((result) => app.listen(3000))
                .catch((err) => {
                    throw new Error('Not Connect to DB Successfully - ' + err)
                })
        })
} else {
    mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true })
        .then((result) => app.listen(3000))
        .catch((err) => {
            throw new Error('Not Connect to DB Successfully - ' + err)
        })
}


app.use(express.json())
app.use(cookieParser())
app.use(morgan("combined", { stream: infoLogger.stream.write || errorLogger.stream.write }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('*', checkUser)
app.use('/', authRoutes)
app.use('/option', requireAuth, optionRoutes)
app.use('/message', requireAuth, messageRoutes)

app.use((err, req, res, next) => {
    res.status(404)
    errorLogger.error(`${new Date().constructor().split(' GMT')[0]} - ${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`)
    next(err)
})

module.exports = app