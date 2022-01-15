import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { deliverOrder, listOrderDetails, orderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_DELIVER_RESET } from '../types/types'

const OrderScreen = () => {
    const dispatch =useDispatch()
    const {id} = useParams()
    const navigate=useNavigate()
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const orderDetails=useSelector(state=>state.getorder)
    const { singleorder, loading, error } = orderDetails
   const orderDelivered=useSelector(state=>state.orderDelivered)
   const {loading:loadingDelivered,success:successDelivered}=orderDelivered
   
   // const {singleorder}=orderdetails
  // singleorder.itemsprice=singleorder.orderItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)
   if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    singleorder.itemsPrice = addDecimals(
      singleorder.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }


    useEffect(()=>{
        if(!userInfo)
        {
            navigate('/')
        }
        if (!singleorder ||  successDelivered || singleorder._id !== id) {
           
            dispatch({ type: ORDER_DELIVER_RESET})
            dispatch(listOrderDetails(id))
          }
   
    },[dispatch,id,successDelivered,singleorder,userInfo])
//    typeof(singleorder) ==='undefined' ? console.log(singleorder) : (dispatch(listOrderDetails(id))
// )  
    
    console.log(singleorder)
    const Handler=()=>{
        
        
        if(userInfo && userInfo.isAdmin)
        {navigate('/admin/orderList')}
        else{
            navigate('/profile')
        }
    }
    const delivered=(id)=>{dispatch(deliverOrder(id))
        dispatch(listOrderDetails(id._id))
        dispatch(orderDetails())
        
    }
    return loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        // <Col md={8} >
        //     {/* {singleorder.orderItems.map((item)=>{<h4>{item.name}</h4>})} */}
        //     <Card className='my-3 p-3 rounded'>
           
        //     {singleorder.orderItems.map((item)=>(<Card.Body key = {item._id}><Row><Col md={6} ><Card.Text>{item.name}</Card.Text><Card.Text >Price:{item.price}</Card.Text><Card.Text >Quantity:{item.qty}</Card.Text></Col><Col md={3} ><Card.Img src={item.image}  /></Col> </Row></Card.Body>))}
        //     Total Paisa Paid : {singleorder.totalprice}

        //     </Card>
        // </Col>
        <Row>
            <Helmet>
            <title>Welcome to Superstore | Order </title>
            
        </Helmet>
            
        <Col md={8}>
        <Button type ='button' className='btn btn-light' onClick={Handler}  >Go Back</Button>
            <ListGroup variant='flush'>
            
                <h3>ORDER: {singleorder._id}</h3>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name:</strong> {singleorder.name.name}</p>
                    <p><strong>Email:</strong> {singleorder.name.email}</p>
                    <p><strong>Address:</strong> {singleorder.shippingAddress.address},{singleorder.shippingAddress.city}</p>
                    {singleorder.isDelivered ? (
                <Message variant='success'>
                  Delivered on {singleorder.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p><strong>Method:</strong> {singleorder.paymentMethod}</p>
                    {singleorder.isPaid ? (
                <Message variant='success'>Paid on {singleorder.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
                </ListGroup.Item>
                {/* <ListGroup.Item>
                    {error&&<Message variant='danger'>{error}</Message>}
                </ListGroup.Item> */}
                <ListGroup.Item>
                    {singleorder.orderItems.length===0?<Message>Your order is Empty</Message>:(<ListGroup variant='flush'>
                        {singleorder.orderItems.map((item,index)=>(<ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image src = {item.image} alt={item.image} fluid rounded/>

                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x ₹{item.price} = ₹{item.qty*item.price}
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
                        <Col>₹{singleorder.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping Price</Col>
                        <Col>₹{singleorder.shippingprice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax Price</Col>
                        <Col>₹{singleorder.taxprice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total Price</Col>
                        <Col>₹{singleorder.totalprice}</Col>
                    </Row>
                </ListGroup.Item>
                {userInfo.isAdmin&& !singleorder.isDelivered&&<Button type ='button' className='btn btn-light' onClick={()=>delivered(singleorder)}>Mark it as Delivered</Button>}
               
            </ListGroup>
            </Card>
        </Col>
    </Row>
    )
   }                     

export default OrderScreen
