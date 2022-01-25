import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { getAllOrder, getOrder, getOrderById, OrderPaid, orderProduct, UpdateOrderToDelivered, UpdateOrderToPaid } from "../controllers/orderController.js";
const router = express.Router()

router.route('/').post(protect,orderProduct).get(protect,admin,getAllOrder)
router.route('/my').get(protect,getOrder)

router.route('/:id').get(protect,getOrderById).put(protect,admin,UpdateOrderToDelivered)
router.route('/:id/pay').put(protect,UpdateOrderToPaid)
router.route('/:id/razerpay').post(OrderPaid)



export default router