import React, { useEffect } from 'react'
import { Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listOrderDetails } from '../actions/orderActions'

const OrderScreen = () => {
    const dispatch =useDispatch()
    const {id} = useParams()
    useEffect(()=>{dispatch(listOrderDetails(id))
   
    },[])

    const orderdetails=useSelector(state=>state.order)
    const {singleorder}=orderdetails
//    typeof(singleorder) ==='undefined' ? console.log(singleorder) : (dispatch(listOrderDetails(id))
// )    
    console.log(singleorder)
    
    return (
        <div>
            {/* {singleorder.orderItems.map((item)=>{<h4>{item.name}</h4>})} */}
            <Card className='my-3 p-3 rounded'>
           
            {singleorder.orderItems.map((item)=>(<Card.Body >{item.name} <Card.Img src={item.image}  /></Card.Body>))}
            {singleorder.totalprice}

            </Card>
        </div>
    )
}

export default OrderScreen
