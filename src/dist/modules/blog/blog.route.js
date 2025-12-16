"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management API
 */
/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   excerpt:
 *                     type: string
 *                   content:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       name: { type: string }
 *                       avatar: { type: string }
 *                   date:
 *                     type: string
 *                   readTime:
 *                     type: string
 *                   status:
 *                     type: string
 *                   views:
 *                     type: number
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get blog post by ID
 *     tags: [Blog]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 excerpt:
 *                   type: string
 *                 content:
 *                   type: string
 *                 image:
 *                   type: string
 *                 category:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     name: { type: string }
 *                     avatar: { type: string }
 *                     bio: { type: string }
 *                 date:
 *                   type: string
 *                 readTime:
 *                   type: string
 *                 status:
 *                   type: string
 *                 views:
 *                   type: number
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 related_posts:
 *                   type: array
 *                   items:
 *                     type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               excerpt: { type: string }
 *               content: { type: string }
 *               category: { type: string }
 *               readTime: { type: string }
 *               author_name: { type: string }
 *               author_avatar: { type: string }
 *               author_bio: { type: string }
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Update an existing blog post
 *     tags: [Blog]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               excerpt: { type: string }
 *               content: { type: string }
 *               category: { type: string }
 *               readTime: { type: string }
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Delete a blog post permanently
 *     tags: [Blog]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.post("/blog", blog_controller_1.createBlog);
router.get("/blog", blog_controller_1.getAllBlogs);
router.get("/blog/:id", blog_controller_1.getBlogById);
router.put("/blog/:id", blog_controller_1.updateBlog);
router.delete("/blog/:id", blog_controller_1.deleteBlog);
exports.default = router;
//# sourceMappingURL=blog.route.js.map