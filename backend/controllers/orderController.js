import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Orders from '../models/ordersModel.js'
import Product from '../models/productModel.js'

const orderProduct=asyncHandler(async(req,res)=>{

    const {address,city,prod,totalprice,taxprice,shippingprice,paymentMethod}=req.body
    
    
    const orderFields={}
    orderFields.name=req.user._id
    orderFields.shippingAddress={address,city}
    orderFields.totalprice  =totalprice
    orderFields.taxprice  =taxprice
    orderFields.shippingprice  =shippingprice
    orderFields.paymentMethod  =paymentMethod
    orderFields.orderItems=(prod)
   const order = new Orders(orderFields)
   
   await order.save()
   res.json(order)

})

const getOrder=asyncHandler(async(req,res)=>{
    const order= await Orders.find({name:req.user._id})
    res.json(order)
})

const getOrderById=asyncHandler(async(req,res)=>{
    const order = await Orders.findById(req.params.id).populate('name','name email')
    if (order){
    res.json(order)
}
else{
    res.status(404)
    throw new Error('Product not found')
}

})
const UpdateOrderToPaid=asyncHandler(async(req,res)=>{
    const order = await Orders.findById(req.params.id)
    if (order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.update_time,
            email_address:req.body.payer.email_address

        }
        const updatedOrder=await order.save()
    res.json(updatedOrder)
}
else{
    res.status(404)
    throw new Error('Product not found')
}

})

export {orderProduct,getOrder,getOrderById,UpdateOrderToPaid}
