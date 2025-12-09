"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seller_controller_1 = require("./seller.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: SellerAccounts
 *   description: Seller account management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64dfad98123b4567890abc12
 *         userId:
 *           type: string
 *           example: 64dfad98123b4567890abc10
 *         fullName:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@email.com
 *         sales_volume:
 *           type: number
 *           example: 1200
 *         return_rate:
 *           type: number
 *           example: 2.5
 *         customer_feedback_score:
 *           type: number
 *           example: 4.8
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         created_at:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /selleraccounts:
 *   post:
 *     summary: Create a new seller account from an existing user
 *     tags: [SellerAccounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64dfad98123b4567890abc10
 *     responses:
 *       201:
 *         description: Seller account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Seller account created successfully
 *                 seller:
 *                   $ref: '#/components/schemas/Seller'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /selleraccounts:
 *   get:
 *     summary: Get all seller accounts
 *     tags: [SellerAccounts]
 *     responses:
 *       200:
 *         description: List of seller accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sellers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Seller'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /selleraccounts/{id}:
 *   get:
 *     summary: Get a seller account by ID
 *     tags: [SellerAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64dfad98123b4567890abc12
 *     responses:
 *       200:
 *         description: Seller found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seller:
 *                   $ref: '#/components/schemas/Seller'
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /selleraccounts/{id}:
 *   put:
 *     summary: Update a seller account
 *     tags: [SellerAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               sales_volume:
 *                 type: number
 *               return_rate:
 *                 type: number
 *               customer_feedback_score:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Seller updated successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /selleraccounts/{id}:
 *   delete:
 *     summary: Delete a seller account
 *     tags: [SellerAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller deleted successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */
router.post("/", seller_controller_1.createSellerAccount);
router.get("/", seller_controller_1.getSellers);
router.get("/:id", seller_controller_1.getSeller);
router.put("/:id", seller_controller_1.updateSeller);
router.delete("/:id", seller_controller_1.deleteSeller);
exports.default = router;
//# sourceMappingURL=seller.route.js.map