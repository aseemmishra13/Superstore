import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Orders from '../models/ordersModel.js'
import Product from '../models/productModel.js'
import Razorpay from 'razorpay'

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
const getAllOrder=asyncHandler(async(req,res)=>{
    const order= await Orders.find({}).populate('name','id name')
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
     
            razorpay_payment_id: req.body.razorpay_payment_id,
            razorpay_order_id: req.body.razorpay_order_id,
            razorpay_signature: req.body.razorpay_signature

        }
        const updatedOrder=await order.save()
    res.json(updatedOrder)
}
else{
    res.status(404)
    throw new Error('Product not found')
}

})
const UpdateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order = await Orders.findById(req.params.id)
    if (order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
       
        const updatedOrder=await order.save()
    res.json(updatedOrder)
}
else{
    res.status(404)
    throw new Error('Product not found')
}

})
const OrderPaid=asyncHandler(async(req,res)=>{
    var instance = new Razorpay({  key_id: process.env.key_id,  key_secret: process.env.key_secret,});
    const order = await Orders.findById(req.params.id)
    const payment_capture = 1
	const amount = parseInt(order.totalprice)
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: req.params.id,
		payment_capture
	}

	try {
		const response = await instance.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
        
	}



})

export {orderProduct,getOrder,getOrderById,UpdateOrderToPaid,getAllOrder,UpdateOrderToDelivered,OrderPaid}
