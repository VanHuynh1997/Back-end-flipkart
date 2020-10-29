import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../../actions/auth.actions';
export default function Header() {
  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const logout = ()=>{
    dispatch(signout())
  }
  const renderLoggedInlinks = ()=>{
    return(
      <Nav className="justify-content-end">
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>Signout</span>
        </li>
        
      </Nav>
    )
  }
  const renderNonLoggedInlinks = ()=>{
    return(
      <Nav className="justify-content-end">
        <li className="nav-item">
          <Link to='signin' className="nav-link">Signin</Link>
        </li>
        <li className="nav-item">
          <Link to='signup' className="nav-link">Signup</Link>
        </li>
        
      </Nav>
    )
  }


    return (
        <>
<Navbar bg="dark" variant="dark" expand="lg" style={{zIndex:1}}>
  <Container fluid>
    <Link to='/' className="navbar-brand">Admin-Dashboard</Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      {auth.authenticate ? renderLoggedInlinks() : renderNonLoggedInlinks()}
    </Navbar.Collapse>
  </Container>
  
</Navbar>
        </>
    )
}
