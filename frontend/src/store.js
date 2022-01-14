import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer ,productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer} from './reducers/productreducers'
import { cartReducer } from './reducers/cartReducers'
import { getUserProfile, userLoginReducer, userRegisterReducer ,userUpdateProfileReducer,userListReducer,userDeleteReducer, userDetailsReducer,userUpdateReducer} from './reducers/usersReducers'
import { getorderReducer, orderAllReducer, orderDeliveredReducer, orderPayReducer, orderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
productList:productListReducer,
productDetails:productDetailsReducer,
cart:cartReducer,
userLogin:userLoginReducer,
userRegister:userRegisterReducer,
userProfile:getUserProfile,
userUpdateProfile:userUpdateProfileReducer,
order:orderReducer,
getorder:getorderReducer,
orderPay:orderPayReducer,
userList:userListReducer,
userDelete:userDeleteReducer,
userDetails:userDetailsReducer,
userUpdate:userUpdateReducer,
productDelete:productDeleteReducer,
productCreate:productCreateReducer,
productUpdate:productUpdateReducer,
orderAll:orderAllReducer,
orderDelivered:orderDeliveredReducer,
productReviewCreate:productReviewCreateReducer,
productTopRated:productTopRatedReducer
})
const orderItemsfromStorage=localStorage.getItem('orderItems')?JSON.parse(localStorage.getItem('orderItems')):[]
const orderItemfromStorage=localStorage.getItem('orderItem')?JSON.parse(localStorage.getItem('orderItem')):[]
const cartItemsfromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const shippingAddressfromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const paymentMethodfromStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):''
const userInfofromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const initialState={cart:{cartItems:cartItemsfromStorage,shippingAddress:shippingAddressfromStorage,paymentMethod:paymentMethodfromStorage},userLogin:{userInfo:userInfofromStorage},getorder:{singleorder:orderItemfromStorage},order:{allorders:orderItemsfromStorage}}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store