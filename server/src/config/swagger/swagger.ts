// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Asset Management API',
            version: '1.0.0',
            description: 'API documentation for Asset Management system'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/config/swagger/*.ts'] // Adjust the path to where your controllers are
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
