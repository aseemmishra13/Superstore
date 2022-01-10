import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link, useParams ,useNavigate} from 'react-router-dom'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import { addToCart,removeFromCart, saveShippingAddress } from '../actions/cartActions'
import { useLocation } from 'react-router-dom'
import { orderConfirm, orderDetails, } from '../actions/orderActions'
import Checkoutsteps from '../components/Checkoutsteps'

const PlaceOrderScree = () => {
    const dispatch=useDispatch()
    const cart = useSelector(state=>state.cart)
    const navigate =useNavigate()
    cart.itemsprice=cart.cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)
    cart.shippingprice = cart.itemsprice>100? 0 : 100
    cart.taxprice = Number((0.18*cart.itemsprice).toFixed(2))
    cart.totalprice = Number(cart.itemsprice)+Number(cart.shippingprice)+Number(cart.taxprice)
    const order=useSelector(state=>state.order)
    const {orders,success,error}=order
    useEffect(()=>{
        if(success){
            navigate(`/orders/${orders._id}`)
        }
    },[success])
    const placeOrderHandler=()=>{
        dispatch(orderConfirm({ address:cart.shippingAddress.address,city:cart.shippingAddress.city,prod: cart.cartItems,totalprice:cart.totalprice,taxprice:cart.taxprice,shippingprice:cart.shippingprice,paymentMethod:cart.paymentMethod}))
        console.log({ address:cart.shippingAddress.address,city:cart.shippingAddress.city,prod: cart.cartItems,totalprice:cart.totalprice,taxprice:cart.taxprice,shippingprice:cart.shippingprice,paymentMethod:cart.paymentMethod})

    }
    
    return (
        <>
        <Checkoutsteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Address:</strong> {cart.shippingAddress.address},{cart.shippingAddress.city}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><strong>Method:</strong> {cart.paymentMethod}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error&&<Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {cart.cartItems.length===0?<Message>Your cart is Empty</Message>:(<ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(<ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src = {item.image} alt={item.image} fluid rounded/>

                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty*item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>))}
                        </ListGroup>)}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemsprice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping Price</Col>
                            <Col>${cart.shippingprice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax Price</Col>
                            <Col>${cart.taxprice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price</Col>
                            <Col>${cart.totalprice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cart.cartItems===0}onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
        </Row>

            
        </>
    )
}

export default PlaceOrderScree
