import express from "express";
import upload from "../../middleware/upload";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  declineProduct
} from "./product.controller"
import Secure from "../../middleware/authMiddleware";
const router = express.Router();

router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);
router.patch("/:id/approve", Secure,approveProduct); 
router.patch("/:id/decline",Secure, declineProduct);
router.delete("/:id/delete", deleteProduct);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         category:
 *           type: string
 *           description: Product category
 *         price:
 *           type: number
 *           description: Product price
 *         quantity:
 *           type: number
 *           description: Available quantity
 *         status:
 *           type: string
 *           enum: [available, out_of_stock, discontinued]
 *           description: Product status
 *         description:
 *           type: string
 *           description: Product description
 *         color:
 *           type: string
 *           description: Product color
 *         available_sizes:
 *           type: array
 *           items:
 *             type: string
 *           description: Available sizes for the product
 *         image_url:
 *           type: string
 *           description: URL of the product image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Product creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Product last update timestamp
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [available, out_of_stock, discontinued]
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               available_sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [available, out_of_stock, discontinued]
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               available_sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}/approve:
 *   patch:
 *     summary: Approve a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products/{id}/decline:
 *   patch:
 *     summary: Decline a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product declined successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

export default router;
