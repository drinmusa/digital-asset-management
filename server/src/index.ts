// Import ENV
import * as dotenv from 'dotenv';

import prisma from './lib/prisma';
// Env Configuration
dotenv.config();

// Other imports
import { app } from './app';
// import { API_PORT } from './config/app';
// Start the Server
const server = app.listen(5000, () => {
    // console.log(`Car Rental API is listening on port ${API_PORT}!`);
    console.log(`Car Rental API is listening on port 5000!`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    server.close(() => process.exit(0));
});
