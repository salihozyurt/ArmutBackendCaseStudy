const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        info: {
            title: 'Learn API',
            version: '1.0.0'
        }
    },
    apis: ["*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocs