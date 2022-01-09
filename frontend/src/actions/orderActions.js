import axios from "axios"
import { GET_ORDER, GET_ORDER_DETAILS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../types/types"


export const orderConfirm=(orderData)=>async (dispatch,getState)=>{
    try {
        const {userLogin:{userInfo}}=getState()
        dispatch({
            type:ORDER_UPDATE_REQUEST
        })
        const config = {
            headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.post('/api/orders',orderData,config)
        dispatch({
            type:ORDER_UPDATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({type:ORDER_UPDATE_FAIL,payload:error.response && error.response.data.message ? error.response.data.message:error.message})
  
        
    }
}

export const orderDetails=()=>async(dispatch,getState)=>{
    try {
        const {userLogin:{userInfo}}=getState()
        const config = {
            headers:{
                    
                    Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/orders',config)
        dispatch({
            type:GET_ORDER_DETAILS,
            payload:data
        })
        localStorage.setItem('orderItems',JSON.stringify(getState().order.allorders))
    } catch (error) {
        dispatch({type:ORDER_UPDATE_FAIL,payload:error.response && error.response.data.message ? error.response.data.message:error.message})
  
    }
}

export const listOrderDetails=(id)=>async (dispatch,getState)=>{
    try {
        dispatch({type: ORDER_UPDATE_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config = {
            headers:{
                    
                    Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`,config)
        dispatch({type: GET_ORDER, payload: data})
    } catch (error) {
        dispatch({type:ORDER_UPDATE_FAIL,payload:error.response && error.response.data.message ? error.response.data.message:error.message})
    }


}