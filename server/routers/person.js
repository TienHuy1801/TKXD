import express from "express";

import * as personController from "../controllers/person.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Identity:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         numberIdentity:
 *           type: integer
 *         dateOfIssue:
 *           type: string
 *         placeOfIssue:
 *           type: string
 *     Person:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         householdId:
 *           type: integer
 *           description: Household Id of person
 *         identityId:
 *           type: integer
 *           description: Identity Id of person
 *         name:
 *           type: string
 *         aliases:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *         birthPlace:
 *           type: string
 *         nation:
 *           type: string
 *         job:
 *           type: string
 *         jobAddress:
 *           type: string
 *         relationship:
 *           type: number
 *         note:
 *           type: string
 *         residencyHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               place:
 *                 type: string
 *               date:
 *                 type: string
 *               note:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *   name: person
 *   description: People managing API
 */
const router = express.Router();

/**
 * @swagger
 * /person:
 *   get:
 *     summary: Return the list of all people
 *     operationId: getPeople
 *     tags: [person]
 *     responses:
 *       200:
 *         description: The list of all people
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
router.get("/", personController.getPeople);

/**
 * @swagger
 * /person/{personId}/:
 *   get:
 *     summary: Get detail of a person
 *     operationId: getPersonDetail
 *     tags: [household]
 *     parameters:
 *       - in: path
 *         name: personId
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     responses:
 *       200:
 *         description: Detail of the person
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  household:
 *                    type: string
 *                  identity:
 *                    type: string
 *                  name:
 *                    type: string
 *                  aliases:
 *                    type: string
 *                  gender:
 *                    type: number
 *                  dateOfBirth:
 *                    type: date
 *                  birthPlace:
 *                    type: string
 *                  nation:
 *                    type: string
 *                  job:
 *                    type: string
 *                  jobAddress:
 *                    type: string
 *                  relationship:
 *                    type: number
 *                  note:
 *                    type: number
 *                  residencyHistory:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        place:
 *                          type: string
 *                        note:
 *                          type: number
 *                        date:
 *                          type: date
 *       500:
 *         description: The message of errors
 */
router.get("/:personId/", personController.getPersonDetail);

/**
 * @swagger
 * /person:
 *   post:
 *     summary: Add new person to database
 *     operationId: addPerson
 *     tags: [person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               householdId:
 *                 type: integer
 *               relationship:
 *                 type: number
 *               name:
 *                 type: string
 *               aliases:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               birthPlace:
 *                 type: string
 *               nation:
 *                 type: string
 *               job:
 *                 type: string
 *               jobAddress:
 *                 type: string
 *               note:
 *                 type: string
 *               numberIdentity:
 *                 type: integer
 *               dateOfIssue:
 *                 type: string
 *               placeOfIssue:
 *                 type: string
 *     responses:
 *       201:
 *         description: The message if the person was added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of the errors
 */
router.post("/", personController.addPerson);

/**
 * @swagger
 * /person/{personId}:
 *   put:
 *     summary: Update infomation of a person
 *     operationId: editPerson
 *     tags: [person]
 *     parameters:
 *       - in: path
 *         name: personId
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               householdId:
 *                 type: integer
 *               relationship:
 *                 type: number
 *               name:
 *                 type: string
 *               aliases:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               birthPlace:
 *                 type: string
 *               nation:
 *                 type: string
 *               job:
 *                 type: string
 *               jobAddress:
 *                 type: string
 *               note:
 *                 type: string
 *               numberIdentity:
 *                 type: integer
 *               dateOfIssue:
 *                 type: string
 *               placeOfIssue:
 *                 type: string
 *     responses:
 *       200:
 *         description: The message if infomation of person updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of the errors
 */
router.put("/:personId", personController.editPerson);

/**
 * @swagger
 * /person/{personId}:
 *   delete:
 *     summary: Delete a person from database
 *     operationId: deletePerson
 *     tags: [person]
 *     parameters:
 *       - in: path
 *         name: personId
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     responses:
 *       200:
 *         description: The message if the person was delete successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of the errors
 */
router.delete("/:personId", personController.deletePerson);

/**
 * @swagger
 * /person/{personId}/residence:
 *   post:
 *     summary: Register for temporary residence
 *     operationId: registerForTemporaryResidence
 *     tags: [person]
 *     parameters:
 *       - in: path
 *         name: personId
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               place:
 *                 type: string
 *               date:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: The message if the person was delete successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: The message of the errors
 */
router.post(
  "/:personId/residence",
  personController.registerForTemporaryResidence
);

router.post(
  "/:personId/death-report",
  personController.reportDeath
);

export default router;
