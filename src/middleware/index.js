const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { swaggerSpec } = require('../swagger/swagger');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static('public'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
};
