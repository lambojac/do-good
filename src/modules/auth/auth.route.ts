import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, logOut, restoreUser, updateUser,updateUserRole } from './auth.controller';
import Secure from "../../middleware/authMiddleware";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 6798fcd938efc0fde951e9e7
 *         fullName:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         phone_number:
 *           type: string
 *           example: "+1234567890"
 *         address:
 *           type: string
 *           example: "123 Main Street"
 *         residentialAddress:
 *           type: string
 *           example: "123 Main Street"
 *         deliveryAddress:
 *           type: string
 *           example: "456 Delivery St"
 *         country:
 *           type: string
 *           example: USA
 *         role:
 *           type: string
 *           enum: [superadmin, admin, vendor, customer]
 *           example: customer
 *         profilePicture:
 *           type: string
 *           example: "https://res.cloudinary.com/.../profile.jpg"
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         deletedAt:
 *           type: string
 *           format: date-time
 *         lastLogin:
 *           type: string
 *           format: date-time
 *         date_created:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - confirmPassword
 *               - phone_number
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [superadmin, admin, vendor, customer]
 *               address:
 *                 type: string
 *               residentialAddress:
 *                 type: string
 *               deliveryAddress:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or user already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user and return authentication token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 role:
 *                   type: string
 *                 address:
 *                   type: string
 *                 lastLogin:
 *                   type: string
 *                   format: date-time
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials or missing fields
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "you are Sucessfully logged out"
 */

/**
 * @swagger
 * /auth/get-all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               role:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Deactivate a user (soft delete)
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/{id}/restore:
 *   patch:
 *     summary: Restore a deactivated user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User restored successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password using token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token / passwords do not match
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/role/{id}:
 *   put:
 *     summary: Update user role
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
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
 *               role:
 *                 type: string
 *                 enum: [superadmin, admin, vendor, customer]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role
 *       404:
 *         description: User not found
 */

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/logout', logOut);
router.get('/get-all-users', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/restore', restoreUser);
router.put("/role/:id",Secure,updateUserRole);

export default router;
