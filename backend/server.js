import express from 'express'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
import morgan from 'morgan'
import Razorpay from 'razorpay'

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


if (process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))

}else{

app.get('/',(req,res)=>{
    res.send('api is running')
})}
var instance = new Razorpay({  key_id: 'rzp_test_nFYsuQDo8Smdp',  key_secret: 'Wz6SECxmdRPKONOPAcKuFeFD',});
var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
  });

app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running on port ${PORT}`))