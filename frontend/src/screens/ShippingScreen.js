import React ,{useEffect, useState}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link, useParams ,useNavigate} from 'react-router-dom'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import { addToCart,removeFromCart, saveShippingAddress } from '../actions/cartActions'
import { useLocation } from 'react-router-dom'
import { orderConfirm, orderDetails, } from '../actions/orderActions'
import Checkoutsteps from '../components/Checkoutsteps'

const ShippingScreen = () => {
  const cart = useSelector(state=>state.cart)
  const {cartItems,shippingAddress}=cart
  let a= cartItems.reduce((acc,cur)=>acc + cur.qty*cur.price,0).toFixed(2)
    const [formData, setFormData] = useState({address:shippingAddress.address,city:shippingAddress.city,prod:[],totalprice:''})
    const {address,city,prod}=formData
    
    const {id}= useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const productId = id
    const qty = location.search ? Number(location.search.split('=')[1]): 1
    const dispatch = useDispatch()
    
    

    useEffect(()=>{
      setFormData({...formData,prod:cartItems,totalprice:Number(a)})
        if(productId){
            dispatch(addToCart(productId,qty))
            
        }
    },[dispatch,productId,qty,cartItems])

    const removeFromCartHandler =(id)=>{
      setFormData({...formData,prod:cartItems,totalprice:Number(a)})
        dispatch(removeFromCart(id))
    }

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

    const checkoutHandler=()=>{
       // navigate('/login?redirect=checkout')
       dispatch(saveShippingAddress({address,city}))
       navigate('/payment')
       
        if(prod)
        {console.log(formData)
        // dispatch(orderConfirm(formData))
        // dispatch(orderDetails())
      }
    }
     
    return (
        <Row>
           <Col md={6}>
             <Checkoutsteps step1 step2/>
        <h1>Address details</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <Form>
               <Form.Group controlId='city'>
                    <Form.Label>City </Form.Label>
                    <Form.Control type='text' placeholder='Enter City' name='city'value={city} onChange={(e)=> onChange(e)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>Residential Address</Form.Label>
                    <Form.Control type='address' placeholder='Enter Address' name='address'value={address} onChange={(e)=> onChange(e)} required></Form.Control>
                </Form.Group>
          </Form>
        )}
      </Col>
      <Col md={6}>
          <Card>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                  <h2>Subtotal ({cartItems.reduce((acc,cur)=>acc+cur.qty,0)})items</h2>
                  ${cartItems.reduce((acc,cur)=>acc + cur.qty*cur.price,0).toFixed(2)}
                  </ListGroup.Item>
              </ListGroup>
              
              <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
                  <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>Proceed to checkout</Button>
              </ListGroup.Item>
          </ListGroup>
          </Card>
      </Col>
        </Row>
    )
}

export default ShippingScreen
