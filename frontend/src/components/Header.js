import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userAction'

const Header = () => {
  const cart = useSelector(state=>state.cart)
  const userLogin = useSelector(state=>state.userLogin)
  const dispatch = useDispatch()
  const {userInfo}=userLogin
  const {cartItems}=cart
  let a=cartItems.length
  const logoutHandler=()=>{
    dispatch(logout())
    
  }
  // useEffect((userInfo)=>{

  // },[userInfo])
    return (
      
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Container>
  <LinkContainer to='/'>
            <Navbar.Brand>Superstore</Navbar.Brand>
          </LinkContainer>
    
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <LinkContainer to='/cart'>
        <Nav.Link><i className='fas fa-shopping-cart'></i>Cart{a===0?'':`(${a})`}</Nav.Link>
        </LinkContainer>
        {userInfo? (<NavDropdown title={userInfo.name}id ='username'><LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
          </NavDropdown>):(<LinkContainer to='/login'>
        <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
        </LinkContainer>)}
        
       </Nav>
      </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
