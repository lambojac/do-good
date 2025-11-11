import express from 'express';
import { landingpageform } from '../controller/landingFormController';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: LandingForm
 *   description: Handles landing page contact form submissions
 */

/**
 * @swagger
 * /landing-page:
 *   post:
 *     summary: Submit a landing page contact form
 *     description: Collects user details and message from the landing page contact form and stores it in the database.
 *     tags: [LandingForm]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - phoneNumber
 *               - subject
 *               - message
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "janedoe@example.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               subject:
 *                 type: string
 *                 example: "Inquiry about pricing plans"
 *               message:
 *                 type: string
 *                 example: "Hi, I'd like to learn more about your premium subscription."
 *     responses:
 *       201:
 *         description: Form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Form submitted successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6739c8f1c3d9e2a61bc9f512"
 *                     fullname:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "janedoe@example.com"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     subject:
 *                       type: string
 *                       example: "Inquiry about pricing plans"
 *                     message:
 *                       type: string
 *                       example: "Hi, I'd like to learn more about your premium subscription."
 *       400:
 *         description: Validation error — missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Server error
 */
router.post('/', landingpageform);
export default router