import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileUser from "./screens/ProfileUser";
import ShippingScreen from "./screens/ShippingScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScree from "./screens/PlaceOrderScree";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrdersScreen from "./screens/OrdersScreen";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
      <Container>
        <Routes>
          <Route path ='/' element={<HomeScreen />} exact/>
          <Route path ='/page/:pageNumber' element={<HomeScreen exact />} />
          <Route path ='/search/:keyword/page/:pageNumber' element={<HomeScreen exact/>} />
          <Route path ='/search/:keyword' element={<HomeScreen />} exact/>
          <Route path ='/product/:id' element={<ProductScreen />}/>
          <Route path ='/cart/:id' element={<CartScreen />}/>
          <Route path ='/cart/' element={<CartScreen />}/>
          <Route path ='/login' element={<LoginScreen />}/>
          <Route path ='/register' element={<RegisterScreen />}/>
          <Route path ='/profile' element={<ProfileUser />}/>
          <Route path ='/login/shipping' element={<ShippingScreen />}/>
          <Route path = '/orders/:id' element={<OrderScreen/>}/>
          <Route path ='/payment' element={<PaymentScreen />}/>
          <Route path ='/admin/userlist' element={<UserListScreen />}/>
          <Route path ='/admin/orderList' element={<OrdersScreen />}/>
          <Route path ='/admin/order/:id/edit' element={<OrderScreen />}/>
          <Route path ='/admin/productList' element={<ProductListScreen exact/>}/>
          <Route path ='/admin/productList/:pageNumber' element={<ProductListScreen exact/>}/>
          <Route path ='/admin/user/:id/edit' element={<UserEditScreen />}/>
          <Route path ='/admin/product/:id/edit' element={<ProductEditScreen />}/>
          <Route path ='/placeorder' element={<PlaceOrderScree />}/>

        </Routes>
      


      </Container>
      </main>
      
      <Footer/>
    
    
    
    </Router>
  );
}

export default App;
