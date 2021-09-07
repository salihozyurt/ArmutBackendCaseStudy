const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        info: {
            title: 'Armut Case API',
            version: '1.0.0'
        }
    },
    apis: ["*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs