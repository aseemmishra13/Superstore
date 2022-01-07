import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productreducers'
import { cartReducer } from './reducers/cartReducers'
import { getUserProfile, userLoginReducer, userRegisterReducer ,userUpdateProfileReducer} from './reducers/usersReducers'

const reducer = combineReducers({
productList:productListReducer,
productDetails:productDetailsReducer,
cart:cartReducer,
userLogin:userLoginReducer,
userRegister:userRegisterReducer,
userProfile:getUserProfile,
userUpdateProfile:userUpdateProfileReducer
})

const cartItemsfromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfofromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const initialState={cart:{cartItems:cartItemsfromStorage},userLogin:{userInfo:userInfofromStorage}}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store