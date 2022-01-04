import mongoose from "mongoose";
import Dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

Dotenv.config()
connectDB()

const importData = async()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        const createdUsers= await User.insertMany(users)
        const adminUsers = createdUsers[0]._id
        const sampleProducts = products.map(produc=>{
            return{...produc,user:adminUsers}
        })
        await Product.insertMany(sampleProducts)
        console.log('Data imported')
        process.exit()
    } catch (error) {
        console.error({error})
        process.exit(1)
        
    }
}

const DestroyData = async()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('Data Destroyed')
        process.exit()
    } catch (error) {
        console.error({error})
        process.exit(1)
        
    }
}

if(process.argv[2]=== '-d'){
    DestroyData()
}else{
    importData()
}