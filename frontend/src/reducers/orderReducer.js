import { GET_ORDER, GET_ORDER_DETAILS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../types/types"


export const orderReducer=(state={},action)=>{
const {type,payload}=action
switch(type){
    case ORDER_UPDATE_REQUEST:
        return{loading:true,...state}
    case ORDER_UPDATE_SUCCESS:
        return{...state,loading:false,orders:payload} 
    case GET_ORDER_DETAILS:
        return{loading:false,allorders:payload}     
    case GET_ORDER:
        return{...state,loading:false,singleorder:payload}       
    case ORDER_UPDATE_FAIL:
        return {loading:false,error:payload}
        
    default:    
    return  state    
}

}