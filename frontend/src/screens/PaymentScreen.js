import React ,{useEffect, useState}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link, useParams ,useNavigate} from 'react-router-dom'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import { addToCart,removeFromCart, savePaymentMethod } from '../actions/cartActions'
import { useLocation } from 'react-router-dom'
import { orderConfirm, orderDetails, } from '../actions/orderActions'
import Checkoutsteps from '../components/Checkoutsteps'


const PaymentScreen = () => {
    const navigate = useNavigate()
  const cart = useSelector(state=>state.cart)
  const {cartItems,shippingAddress}=cart
  if(!shippingAddress){
      navigate('/login/shipping')

  }
  
    // const [formData, setFormData] = useState({address:'',city:'',prod:[],totalprice:''})
    // const {address,city,prod}=formData
    const [paymentMethod,setPaymentMethod]=useState('Paypal')
    
    const {id}= useParams()
    const location = useLocation()
    
    
    const dispatch = useDispatch()
    
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    

    

   //const onChange=e=>setPaymentMethod({...formData,[e.target.name]:e.target.value})

    const checkoutHandler=()=>{
       // navigate('/login?redirect=checkout')
       
       
    //     if(prod)
    //     {console.log(formData)
    //     dispatch(orderConfirm(formData))
    //     dispatch(orderDetails())
    //   }
    }
     
    return (
        <Row>
           <Col md={6}>
           <Checkoutsteps step1 step2 step3/>
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label as='legend'>Select Method</Form.Label>
           
              <Col>
                    <Form.Check type = 'radio' label='Paypal or Credit Card' id='Paypal' name='paymentMethod' value = 'Paypal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type = 'radio' label='Paytm' id='Paytm' name='paymentMethod' value = 'Paytm'  onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
              
              </Col>
              </Form.Group>
               <Button type='submit' variant='primary'>Continue</Button>
                
          </Form>
      
      </Col>
      
        </Row>
    )
}

export default PaymentScreen
