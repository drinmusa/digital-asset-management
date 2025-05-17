/**
 * @swagger
 * tags:
 *   name: Warranty
 *   description: API endpoints for managing warranty quotes
 */

/**
 * @swagger
 * /get-quote/{id}:
 *   get:
 *     summary: Get a warranty quote by asset ID
 *     tags: [Warranty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The asset ID to fetch warranty quote for
 *     responses:
 *       200:
 *         description: Warranty quote fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quote:
 *                   type: number
 *                   description: The warranty quote amount
 *                 expiryDate:
 *                   type: string
 *                   format: date
 *                   description: Expiry date of the warranty quote
 *       404:
 *         description: Warranty quote not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a paginated list of warranty quotes for the authenticated user
 *     tags: [Warranty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of warranty quotes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 warranties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       quote:
 *                         type: number
 *                       expiryDate:
 *                         type: string
 *                         format: date
 *                       assetId:
 *                         type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
