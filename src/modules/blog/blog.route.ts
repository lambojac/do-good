import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "./blog.controller";



const router = express.Router();

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


router.post("/blog", createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id",  updateBlog);
router.delete("/blog/:id", deleteBlog);

export default router;
