import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrder, orderProduct } from "../controllers/orderController.js";
const router = express.Router()

router.route('/').post(protect,orderProduct)
router.route('/').get(protect,getOrder)



export default router