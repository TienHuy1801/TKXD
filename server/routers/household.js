import express from "express";

import * as householdController from '../controllers/household.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Household:
 *       type: object
 *       required:
 *         - headId
 *       properties:
 *         _id:
 *           type: string
 *         headId:
 *           type: integer
 *           description: Head member Id
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: integer
 *         number:
 *           type: integer
 *         apartmentNumber:
 *           type: integer
 *         place:
 *           type: string
 *         change:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 */

 /**
  * @swagger
  * tags:
  *   name: household
  *   description: Households managing API
  */

const router = express.Router();

/**
 * @swagger
 * /household:
 *   get:
 *     summary: Return the list of all households
 *     operationId: getHousehold
 *     tags: [household]
 *     responses:
 *       200:
 *         description: The list of households
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Household'
 */
router.get('/', householdController.getHousehold);

/**
 * @swagger
 * /household:
 *   post:
 *     summary: Create a new household
 *     operationId: createHousehold
 *     tags: [household]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *               apartmentNumber:
 *                 type: integer
 *               place:
 *                 type: string
 *     responses:
 *       201:
 *         description: Infomation of household after create successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Household'
 *       500:
 *         description: The message of errors
 */
router.post('/', householdController.createHousehold);

/**
 * @swagger
 * /household/{householdId}:
 *   put:
 *     summary: Modify information of a household
 *     operationId: editHousehold
 *     tags: [household]
 *     parameters:
 *       - in: path
 *         name: householdId
 *         schema:
 *           type: string
 *         required: true
 *         description: The household id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *               apartmentNumber:
 *                 type: integer
 *               place:
 *                 type: string
 *     responses:
 *       200:
 *         description: Infomation of household after change successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Household'
 *       500:
 *         description: The message of errors
 */
router.put('/:householdId/', householdController.editHousehold);

/**
 * @swagger
 * /household/{householdId}:
 *   delete:
 *     summary: Delete a household
 *     operationId: deleteHousehold
 *     tags: [household]
 *     parameters:
 *       - in: path
 *         name: householdId
 *         schema:
 *           type: string
 *         required: true
 *         description: The household id
 *     responses:
 *       200:
 *         description: The message household was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of errors
 */
router.delete('/:householdId', householdController.deleteHousehold);

/**
 * @swagger
 * /household/{householdId}/:
 *   get:
 *     summary: Get detail of a household
 *     operationId: getHouseholdDetail
 *     tags: [household]
 *     parameters:
 *       - in: path
 *         name: householdId
 *         schema:
 *           type: string
 *         required: true
 *         description: The household id
 *     responses:
 *       200:
 *         description: Detail of the household
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   headId:
 *                     type: integer
 *                     description: Head member Id
 *                   members:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         memberId:
 *                           type: integer
 *                   number:
 *                     type: integer
 *                   apartmentNumber:
 *                     type: integer
 *                   place:
 *                     type: string
 *                   change:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         content:
 *                           type: string
 *                         date:
 *                           type: string
 *                   paidStatus:
 *                     type: object
 *                     properties:
 *                       money:
 *                         $ref: '#/components/schemas/Money'
 *                       household:
 *                         type: integer
 *                       paidMoney:
 *                         type: number
 *                       paidHistory:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             value:
 *                               type: number
 *                             paidDate:
 *                               type: number
 *                       requiredMoney:
 *                         type: number
 *                       totalRequiredMoney:
 *                         type: number     
 *       500:
 *         description: The message of errors
 */
router.get('/:householdId/', householdController.getHouseholdDetail);

// hasn't impelmented in swagger yet
router.post('/separation', householdController.separationHousehold);

export default router;