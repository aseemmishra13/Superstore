import mongoose  from "mongoose";

const orderSchema = mongoose.Schema({
name:{
    type: mongoose.Schema.Types.ObjectId,
    
    ref:'User'
},
orderItems:[{
    name:{type:String},
    qty:{type:Number},
    image:{type:String},
    price:{type:Number},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
}],
shippingAddress:{
    address:{type:String},
    city:{type:String},
    postalCode:{type:String},
    country:{type:String}
},
paymentMethod:{
    type: String
    
    
},
paymentResult:{
    razorpay_payment_id:{type:String},
    razorpay_order_id:{type:String},
    razorpay_signature:{type:String}

    
},
taxprice:{
    type: Number,
    
    default:0.0
    
},
shippingprice:{
    type: Number,
    
    default:0.0
    
},
totalprice:{
    type: Number,
    
    default:0.0
    
},
isPaid:{
    type: Boolean,
    
    default:false
    
},

paidAt:{
    type: Date,
    
    
},
isDelivered:{
    type: Boolean,
    
    default:false
    
},
deliveredAt:{
    type: Date,
    
    
}



},{timestamps:true})

const Orders = mongoose.model('Orders',orderSchema)

export default Orders