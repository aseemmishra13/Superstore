import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
  const cart = useSelector(state=>state.cart)
  const {cartItems}=cart
  let a=cartItems.length
    return (
      
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Container>
  <LinkContainer to='/'>
            <Navbar.Brand>Superstore</Navbar.Brand>
          </LinkContainer>
    
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="ml-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
          <LinkContainer to='/cart'>
        <Nav.Link><i className='fas fa-shopping-cart'></i>Cart{a===0?'':`(${a})`}</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/login'>
        <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
        </LinkContainer>
       </Nav>
      </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
