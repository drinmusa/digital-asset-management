/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check endpoint
 */

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Health check ping endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns pong message confirming the server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Pong!
 */
