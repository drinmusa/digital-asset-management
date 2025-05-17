/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: API endpoints for managing assets
 */

/**
 * @swagger
 * /assets:
 *   post:
 *     summary: Create a new asset
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - purchaseDate
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Asset created successfully
 */

/**
 * @swagger
 * /assets:
 *   get:
 *     summary: Get paginated list of assets for a user
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of assets
 */

/**
 * @swagger
 * /assets/{id}:
 *   get:
 *     summary: Get a single asset by ID
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The asset ID
 *     responses:
 *       200:
 *         description: Asset fetched successfully
 *       404:
 *         description: Asset not found
 */
