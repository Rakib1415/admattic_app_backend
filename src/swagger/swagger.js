const swaggerJSdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `ADMATTIC API'S`,
            description: 'API documentation for the ADMATTIC APP',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Server',
            }
        ]
    },
    apis: ['./src/swagger/api.yaml']
};

module.exports.swaggerSpec = swaggerJSdoc(options)