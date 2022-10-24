import express from "express";

import * as moneyController from "../controllers/money.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Money:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: integer
 *         startDate:
 *           type: number
 *         cycle:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *             value:
 *               type: integer
 *         note:
 *           type: string
 *         amountOfMoney:
 *           type: number
 *         moneyType:
 *           type: integer
 *
 *     CollectStatus:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         money:
 *           type: integer
 *         household:
 *           type: integer
 *         paidMoney:
 *           type: number
 *         paidHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               paidDate:
 *                 type: number
 */

 /**
  * @swagger
  * tags:
  *   name: money
  *   description: Money managing API
  */
const router = express.Router();

/**
 * @swagger
 * /money:
 *   get:
 *     summary: Return the list of all money
 *     operationId: getMoney
 *     tags: [money]
 *     responses:
 *       200:
 *         description: The list of money
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Money'
 */
router.get("/", moneyController.getMoney);

/**
 * @swagger
 * /money/period:
 *   get:
 *     summary: Return the list of all period money
 *     operationId: getPeriodMoney
 *     tags: [money]
 *     responses:
 *       200:
 *         description: The list of period money
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Money'
 */
 router.get("/period", moneyController.getPeriodMoney);

 /**
 * @swagger
 * /money/contribution:
 *   get:
 *     summary: Return the list of all contribution money
 *     operationId: getContributionMoney
 *     tags: [money]
 *     responses:
 *       200:
 *         description: The list of contribution money
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Money'
 */
router.get("/contribution", moneyController.getContributionMoney);

/**
 * @swagger
 * /money:
 *   post:
 *     summary: Create a new money
 *     operationId: addMoney
 *     tags: [money]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: integer
 *               startDate:
 *                 type: number
 *               cycle:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   value:
 *                     type: integer
 *               note:
 *                 type: string
 *               amountOfMoney:
 *                 type: number
 *               moneyType:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Info of new money was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Money'
 *       500:
 *         description: The message of errors
 */
router.post("/", moneyController.addMoney);

/**
 * @swagger
 * /money/{moneyId}:
 *   put:
 *     summary: Modify information of a money
 *     operationId: editMoney
 *     tags: [money]
 *     parameters:
 *       - in: path
 *         name: moneyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The money id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: integer
 *               startDate:
 *                 type: number
 *               cycle:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   value:
 *                     type: integer
 *               note:
 *                 type: string
 *               amountOfMoney:
 *                 type: number
 *               moneyType:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Infomation of money after change successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Money'
 *       500:
 *         description: The message of errors
 */
router.put("/:moneyId", moneyController.editMoney);

/**
 * @swagger
 * /money/{moneyId}:
 *   delete:
 *     summary: Delete a money
 *     operationId: deleteMoney
 *     tags: [money]
 *     parameters:
 *       - in: path
 *         name: moneyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The money id
 *     responses:
 *       200:
 *         description: The message money was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of errors
 */
router.delete("/:moneyId", moneyController.deleteMoney);

/**
 * @swagger
 * /money/{moneyId}/:
 *   get:
 *     summary: Get detail of a money
 *     operationId: getMoneyDetail
 *     tags: [money]
 *     parameters:
 *       - in: path
 *         name: moneyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The money id
 *     responses:
 *       200:
 *         description: Detail of the money
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: integer
 *                   startDate:
 *                     type: number
 *                   cycle:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       value:
 *                         type: integer
 *                   note:
 *                     type: string
 *                   amountOfMoney:
 *                     type: number
 *                   moneyType:
 *                     type: integer
 *                   collectStatus:
 *                     type: object
 *                     properties:
 *                       money:
 *                         type: integer
 *                       household:
 *                         $ref: '#/components/schemas/Household'
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
router.get("/:moneyId/", moneyController.getMoneyDetail);

/**
 * @swagger
 * /money/{moneyId}/collect-status:
 *   put:
 *     summary: Modify collect status of a money
 *     operationId: updateMoneyCollectStatus
 *     tags: [money]
 *     parameters:
 *       - in: path
 *         name: moneyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The money id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               householdId:
 *                 type: integer
 *               paidMoney:
 *                 type: number
 *     responses:
 *       200:
 *         description: The message collect status of money was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of errors
 */
router.put("/:moneyId/collect-status", moneyController.updateMoneyCollectStatus);

export default router;
