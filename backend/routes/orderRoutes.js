import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrder, getOrderById, orderProduct } from "../controllers/orderController.js";
const router = express.Router()

router.route('/').post(protect,orderProduct)
router.route('/').get(protect,getOrder)
router.route('/:id').get(protect,getOrderById)



export default router