import express from "express";
import { createNewReview, createProduct, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productController.js'
import { protect,admin } from "../middleware/authMiddleware.js";
const router = express.Router()

router.route('/').get(getProducts).post(protect,admin,createProduct)
router.get('/top',getTopProducts)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,createNewReview)


export default router