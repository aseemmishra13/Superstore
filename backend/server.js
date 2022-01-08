import express from 'express'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const app = express()
app.use(express.json())

dotenv.config()

connectDB()

app.get('/',(req,res)=>{
    res.send('api is running')
})
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running on port ${PORT}`))