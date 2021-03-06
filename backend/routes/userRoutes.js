import express from "express";
import { protect,admin } from "../middleware/authMiddleware.js";
import { authUser, deleteUsers, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from "../controllers/userController.js";
const router = express.Router()

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUserById).put(protect,admin,updateUser)


export default router