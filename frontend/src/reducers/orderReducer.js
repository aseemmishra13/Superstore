import { GET_ORDER, GET_ORDER_DETAILS, GET_ORDER_RESET, ORDER_ALL_FAIL, ORDER_ALL_REQUEST, ORDER_ALL_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../types/types"


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
export const orderAllReducer=(state = { orders: [] },action)=>{
    const {type,payload}=action
    switch(type){
        case ORDER_ALL_REQUEST:
            return{loading:true}
        case ORDER_ALL_SUCCESS:
            return{loading:false,orders:payload} 
   
           
        case ORDER_ALL_FAIL:
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
        case GET_ORDER_RESET:
            return{
                singleorder:{}
            }    
        case ORDER_UPDATE_FAIL:
            return {loading:false,error:payload}
            
        default:    
        return  state    
    }
    
    }
    
    export const orderPayReducer=(state={},action)=>{
        const {type,payload}=action
        switch(type){
            case ORDER_PAY_REQUEST:
                return{loading:true}
              
            case ORDER_PAY_SUCCESS:
                return{loading:false,success:true}       
            case ORDER_PAY_FAIL:
                return {loading:false,error:payload}
            case ORDER_PAY_RESET:
                return{}    
            default:    
            return  state    
        }
        
        }

        export const orderDeliveredReducer=(state={},action)=>{
            const {type,payload}=action
            switch(type){
                case ORDER_DELIVER_REQUEST:
                    return{loading:true}
                  
                case ORDER_DELIVER_SUCCESS:
                    return{loading:false,success:true}       
                case ORDER_DELIVER_FAIL:
                    return {loading:false,error:payload}
                 
                default:    
                return  state    
            }
            
            }     