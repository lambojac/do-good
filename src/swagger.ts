import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Do-good api documentation',
      version: '1.0.0',
      description: 'API documentation for DO-GOOD Backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api', 
      },
    ],
  },
  apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
