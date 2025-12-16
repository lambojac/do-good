import { Router } from "express";
import { createGalleryItem, getGallery,updateGalleryItem,deleteGalleryItem } from "./gallery.controller";
import  upload  from "../../middleware/upload";

const router = Router();

router.post("/", upload.single("image"), createGalleryItem);
router.get("/", getGallery);
router.put("/:id", upload.single("image"), updateGalleryItem);
router.delete("/:id", deleteGalleryItem);
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
/**
 * @swagger
 * /gallery/{id}:
 *   put:
 *     summary: Update a gallery item
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gallery item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Chair"
 *               category:
 *                 type: string
 *                 enum: ["Products", "Store"]
 *                 example: "Store"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload a new image to replace the old one
 *     responses:
 *       200:
 *         description: Successfully updated gallery item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gallery'
 *       404:
 *         description: Gallery item not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a gallery item
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gallery item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted gallery item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gallery item deleted successfully"
 *       404:
 *         description: Gallery item not found
 *       500:
 *         description: Server error
 */


export default router;
