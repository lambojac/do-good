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
 * /selleraccounts:
 *   post:
 *     summary: Create a new seller account
 *     tags: [SellerAccounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
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
 *       201:
 *         description: Seller account created
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
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /selleraccounts/{id}:
 *   get:
 *     summary: Get seller account by ID
 *     tags: [SellerAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller found
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
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
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
 *         description: Seller updated
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
 *         description: Seller deleted
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