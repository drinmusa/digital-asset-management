import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger/swagger';
// Routes
import { routes } from './routes';

// Middleware
import { CorsMiddleware } from './middleware/Cors.middleware';
import { AppErrorHandlerMiddleware } from './middleware/AppErrorHandler.middleware';

export const app: Application = express();

// CORS
app.use(CorsMiddleware);

// Express configuration
app.use(express.json());

// Application routing
routes(app);

// Application (global) error handling
app.use(AppErrorHandlerMiddleware);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
