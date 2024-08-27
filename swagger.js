const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0',
            description: 'A simple Express Book API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            schemas: {
                Book: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Unique identifier for the book',
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the book',
                        },
                        author: {
                            type: 'string',
                            description: 'Author of the book',
                        },
                        isbn: {
                            type: 'string',
                            description: 'ISBN number of the book',
                        },
                        publishedDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Publication date of the book',
                        },
                    },
                    required: ['title', 'author', 'isbn', 'publishedDate'],
                },
            },
        },
    },
    apis: ['./routes/bookRoutes.js', './controllers/bookController.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
