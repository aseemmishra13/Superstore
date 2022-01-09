import React,{useEffect,useState} from 'react'
import { Form,Button ,Row,Col, Card} from 'react-bootstrap'

import { useDispatch,useSelector } from 'react-redux'

import { useNavigate ,Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProfile, UpdateUserProfile } from '../actions/userAction'
import { orderDetails } from '../actions/orderActions'

const ProfileUser = () => {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setconfirmPassword]=useState('')
    const userProfile = useSelector(state=>state.userProfile)
   
    const {profile,error,loading} = userProfile
    const userLogin = useSelector(state=>state.userLogin)
    // const order=useSelector(state=>state.order)
    // const {orders}=order
    
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
   
    const {success} = userUpdateProfile
 
    const navigate=useNavigate()
    const dispatch =useDispatch()
    
    useEffect(()=>{
        dispatch(orderDetails())
if(!userInfo){
    navigate('/login')

}
else{
    if(!profile.name){
        dispatch(getProfile())
    }
    else{
        setName(profile.name)
        setEmail(profile.email)
    }
}
    },[navigate,profile,dispatch])
    const order = useSelector(state=>state.order)
    const {allorders} = order
    // const {orderItems} = allorders
   
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmpassword){
            alert('Enter the same password in both field')
        }
        else{
            dispatch(UpdateUserProfile({id: profile._id,name,email}))


        }
    }
    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading&&<Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>name </Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=> setName(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password again' value={confirmpassword} onChange={(e)=> setconfirmPassword(e.target.value)} required></Form.Control>
                </Form.Group>
                <Button type ='submit' variant='primary'>Update</Button>
            </Form>

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {allorders.map((item)=>(
                    <Card key ={item._id} className='my-3 p-3 rounded'>
                        <Card.Title><Link to={`/orders/${item._id}`}>Order : {item._id}</Link></Card.Title>
                    {item.orderItems.map((items)=>(<Card.Text key = {items._id}>{items.name} QTY: {items.qty} price: $ {items.price*items.qty}</Card.Text>))}
                    <h4 > Total Price : ${item.totalprice}</h4>
                    </Card>
                ))}
               
            </Col>
            
        </Row>
    )
}

export default ProfileUser
