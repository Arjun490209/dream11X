import express from "express"
const payRouter = express.Router()

import auth from "../middleware/auth.middleware.js"
import paymentController from '../controllers/payment.controller.js'



payRouter.post("/order", auth, paymentController.createOrder)
payRouter.post("/verify", auth, paymentController.verifyPayment)

export default payRouter