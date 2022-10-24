import express from "express";

import * as authController from "../controllers/auth.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: number
 */

 /**
  * @swagger
  * tags:
  *   name: user
  *   description: Users managing API
  */

const router = express.Router();

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in for an user
 *     operationId: signIn
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Infomation of user if sign in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The message of why sign in failed
 *       500:
 *         description: The message of errors
 */
router.post("/sign-in", authController.signIn);

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Create a new account
 *     operationId: signUp
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Infomation of new user if created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The message of why sign up failed
 *       500:
 *         description: The message of errors
 */
router.post("/sign-up", authController.signUp);

export default router;
