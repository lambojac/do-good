"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controller_1 = require("./gallery.controller");
const upload_1 = __importDefault(require("../../middleware/upload"));
const router = (0, express_1.Router)();
router.post("/", upload_1.default.single("image"), gallery_controller_1.createGalleryItem);
router.get("/", gallery_controller_1.getGallery);
/**
 * @swagger
 * components:
 *   schemas:
 *     Gallery:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - imageUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           example: "Elegant Sofa"
 *         category:
 *           type: string
 *           enum: ["Products", "Store"]
 *           example: "Products"
 *         imageUrl:
 *           type: string
 *           example: "https://res.cloudinary.com/your-cloud/image/upload/v123/image.png"
 */
/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery management API
 */
/**
 * @swagger
 * /gallery:
 *   post:
 *     summary: Upload a new gallery item
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - title
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Wooden Chair"
 *               category:
 *                 type: string
 *                 enum: ["Products", "Store"]
 *                 example: "Products"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload image file
 *     responses:
 *       201:
 *         description: Successfully created gallery item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: Missing image or invalid fields
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /gallery:
 *   get:
 *     summary: Get all gallery items
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: List of gallery items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gallery'
 *       500:
 *         description: Server error
 */
exports.default = router;
//# sourceMappingURL=gallery.route.js.map