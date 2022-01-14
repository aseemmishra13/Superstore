import React,{useEffect,useState} from 'react'
import { Form,Button ,Row,Col, Card, Table} from 'react-bootstrap'

import { useDispatch,useSelector } from 'react-redux'

import { useNavigate ,Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProfile, UpdateUserProfile } from '../actions/userAction'
import { listOrderDetails, orderDetails } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Helmet } from 'react-helmet'

const ProfileUser = () => {
    const dispatch =useDispatch()
    const navigate=useNavigate()
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
    const order = useSelector(state=>state.order)
    const {allorders} = order
    
   
    
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
    const onclickhandler=(id)=>{
        
        dispatch(listOrderDetails(id))
        
        
    }
    return (
        <Row>
           <Helmet>
            <title>Welcome to Superstore | Profile </title>
            
        </Helmet>
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
                {/* {allorders.map((item)=>(
                    <Card key ={item._id} className='my-3 p-3 rounded'>
                        <Card.Title> <Link key = {item._id} to={`/orders/${item._id}`} >Order : {item._id}</Link></Card.Title>
                    {item.orderItems.map((items)=>(<Card.Text key = {items._id}>{items.name} QTY: {items.qty} price: $ {items.price*items.qty}</Card.Text>))}
                    <h4 > Total Price : ${item.totalprice}</h4>
                    </Card>
                ))} */}
               <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allorders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalprice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            </Col>
            
        </Row>
    )
}

export default ProfileUser
