import axios from "axios"
import { ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../types/types"


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
        const {data}= await axios.put('/api/orders',orderData,config)
        dispatch({
            type:ORDER_UPDATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({type:ORDER_UPDATE_FAIL,payload:error.response && error.response.data.message ? error.response.data.message:error.message})
  
        
    }
}