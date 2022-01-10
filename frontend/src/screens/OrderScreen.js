import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { listOrderDetails, orderDetails } from '../actions/orderActions'
import Message from '../components/Message'

const OrderScreen = () => {
    const dispatch =useDispatch()
    const {id} = useParams()
    const navigate=useNavigate()

    const singleorder=useSelector(state=>state.getorder.singleorder)
   // const {singleorder}=orderdetails
   singleorder.itemsprice=singleorder.orderItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)

    useEffect(()=>{
        if(id){
        dispatch(listOrderDetails(id))
        dispatch(orderDetails())

        }
   
    },[dispatch,id])
//    typeof(singleorder) ==='undefined' ? console.log(singleorder) : (dispatch(listOrderDetails(id))
// )    
    console.log(singleorder)
    const Handler=()=>{
        
        navigate('/profile')
    }
    return (
        // <Col md={8} >
        //     {/* {singleorder.orderItems.map((item)=>{<h4>{item.name}</h4>})} */}
        //     <Card className='my-3 p-3 rounded'>
           
        //     {singleorder.orderItems.map((item)=>(<Card.Body key = {item._id}><Row><Col md={6} ><Card.Text>{item.name}</Card.Text><Card.Text >Price:{item.price}</Card.Text><Card.Text >Quantity:{item.qty}</Card.Text></Col><Col md={3} ><Card.Img src={item.image}  /></Col> </Row></Card.Body>))}
        //     Total Paisa Paid : {singleorder.totalprice}

        //     </Card>
        // </Col>
        <Row>
        <Col md={8}>
        <Button type ='button' className='btn btn-light my-3' onClick={Handler}  >Go Back</Button>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Address:</strong> {singleorder.shippingAddress.address},{singleorder.shippingAddress.city}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p><strong>Method:</strong> {singleorder.paymentMethod}</p>
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
                        <Col>${singleorder.itemsprice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping Price</Col>
                        <Col>${singleorder.shippingprice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax Price</Col>
                        <Col>${singleorder.taxprice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total Price</Col>
                        <Col>${singleorder.totalprice}</Col>
                    </Row>
                </ListGroup.Item>
               
            </ListGroup>
            </Card>
        </Col>
    </Row>
    )
}

export default OrderScreen
