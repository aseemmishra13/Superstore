import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { orderProduct } from "../controllers/orderController.js";
const router = express.Router()

router.route('/').put(protect,orderProduct)



export default router