import express from "express";
import { getUserCart, addToCart } from "./cartController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cart_item_id:
 *                         type: string
 *                       product_id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image_url:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       stock:
 *                         type: number
 *                       subtotal:
 *                         type: number
 *                 subtotal:
 *                   type: number
 *                 tax:
 *                   type: number
 *                 total:
 *                   type: number
 *       404:
 *         description: User or cart not found
 */
router.get("/:userId", getUserCart);


/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to user cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *               - quantity
 *             properties:
 *               user_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *                   properties:
 *                     items_count:
 *                       type: number
 *                     total:
 *                       type: number
 *       404:
 *         description: User or product not found
 */
router.post("/add", addToCart);

export default router;
