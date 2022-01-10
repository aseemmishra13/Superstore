import { GET_ORDER, GET_ORDER_DETAILS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../types/types"


export const orderReducer=(state={},action)=>{
const {type,payload}=action
switch(type){
    case ORDER_UPDATE_REQUEST:
        return{loading:true}
    case ORDER_UPDATE_SUCCESS:
        return{loading:false,orders:payload,success:true} 
    case GET_ORDER_DETAILS:
        return{...state,loading:false,allorders:payload}     
       
    case ORDER_UPDATE_FAIL:
        return {loading:false,error:payload}
        
    default:    
    return  state    
}

}

export const getorderReducer=(state={singleorder:{}},action)=>{
    const {type,payload}=action
    switch(type){
        case ORDER_UPDATE_REQUEST:
            return{loading:true,...state}
          
        case GET_ORDER:
            return{...state,loading:false,singleorder:payload}       
        case ORDER_UPDATE_FAIL:
            return {loading:false,error:payload}
            
        default:    
        return  state    
    }
    
    }
    
    