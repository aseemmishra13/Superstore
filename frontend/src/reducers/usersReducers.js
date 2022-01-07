import { GET_USER_PROFILE, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../types/types"
const initialState={
    token: localStorage.getItem('token'),
    error:null,
    loading:null,
    user:null,
    profile:{}
}

export const userLoginReducer =(state={},action)=>{
    const {type,payload} = action

    switch(type){
        case USER_LOGIN_REQUEST:
            return{loading:true}

        case USER_LOGIN_SUCCESS:
            return{loading:false,userInfo:payload}
        case USER_LOGIN_FAIL:
           return {loading:false,error:payload}
        case USER_LOGOUT:
            return {}   
        default:    
        return  state      

    }

}

export const userRegisterReducer =(state=initialState,action)=>{
    const {type,payload} = action

    switch(type){
        case USER_REGISTER_REQUEST:
            return{loading:true}

        case USER_REGISTER_SUCCESS:
            return{loading:false,user:payload}
        case USER_REGISTER_FAIL:
           return {loading:false,error:payload}
        
        default:    
        return  state      

    }

}

export const getUserProfile=(state=initialState,action)=>{
    const{type,payload}=action  
    switch(type){
        case GET_USER_PROFILE:
            return{loading:false,profile:payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:payload}    
        default:
            return state

    }

}
export const userUpdateProfileReducer=(state={initialState},action)=>{
    const{type,payload}=action  
    switch(type){
        case USER_UPDATE_PROFILE_REQUEST:
            return{loading:true}

         case USER_UPDATE_PROFILE_SUCCESS:
            return{loading:false,userInfo:payload,success:true}
        case USER_UPDATE_PROFILE_FAIL:
           return {loading:false,error:payload}  
        default:
            return state

    }

}