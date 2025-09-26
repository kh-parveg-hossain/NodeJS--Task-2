import express from "express";
const router = express.Router();
import {getPrice, getSymbol, getUser} from "../controllers/controllers"
import {createAlert, listAlerts} from "./alerts"


/**
 * @swagger
 * /:
 *   get:
 *     summary: Get user info
 *     responses:
 *       200:
 *         description: User data retrieved
 */
router.get("/",getUser)
/**
 * @swagger
 * /prices:
 *   get:
 *     summary: Get real-time crypto prices
 *     responses:
 *       200:
 *         description: Price data retrieved
 */
router.get("/prices",getPrice)

/**
 * @swagger
 * /prices/{symbol}:
 *   post:
 *     summary: Get price by symbol
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price retrieved for the given symbol
 */
router.post("/prices/:symbol",getSymbol)
/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Create a new alert
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Alert created successfully
 */
router.post("/alerts",createAlert)
/**
 * @swagger
 * /alerts/list:
 *   get:
 *     summary: List all alerts
 *     responses:
 *       200:
 *         description: List of alerts
 */
router.get("/alerts/list",listAlerts)








export default router