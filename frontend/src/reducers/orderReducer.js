import { ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../types/types"

export const orderReducer=(state={},action)=>{
const {type,payload}=action
switch(type){
    case ORDER_UPDATE_REQUEST:
        return{loading:true}
    case ORDER_UPDATE_SUCCESS:
        return{loading:false,orders:payload}    
    case ORDER_UPDATE_FAIL:
        return {loading:false,error:payload}
        
    default:    
    return  state    
}

}