import React,{useEffect} from 'react'
import { Table,Button} from 'react-bootstrap'
import { orderAllDetails } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Helmet } from 'react-helmet'

const OrdersScreen = () => {
    const dispatch = useDispatch()
    const orderAll=useSelector(state=>state.orderAll)
    const {loading,error,orders}=orderAll
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const navigate = useNavigate()
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin)
        {dispatch(orderAllDetails())}
        else{
            navigate('/')
        }
    },[dispatch,userInfo])
    // const deleteHandler=(id)=>{
    //     if(window.confirm('Are you sure')){
    //     dispatch(deleteUser(id))}
    // }
    return (
        <>
        <Helmet>
            <title>Welcome to Superstore | Order </title>
            
        </Helmet>
        <h1>Orders</h1>
        {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Shipping Address</th>
                        <th>Payment Method</th>
                        <th>Total price</th>
                        <th>Payment Status</th>
                        <th>Delivery Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.name.name}</td>
                            <td>{order.shippingAddress.address},{order.shippingAddress.city}</td>
                            <td>₹{order.totalprice}</td>
                            <td>{order.isPaid?'Paid':'not paid'}</td>
                            <td>{order.isDelivered?'Delivered':'not Delivered'}</td>
                            <td><LinkContainer to={`/orders/${order._id}`}><Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button></LinkContainer></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
            
        </>
    )
}

export default OrdersScreen
