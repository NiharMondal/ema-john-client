import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <Link to="/">
            <img style={{ width: '100px' }} src={logo} alt="" />
          </Link>
         
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ padding: '0', margin: '0' }} className="ml-auto ">
            <Nav.Link className="nav_link" href="/review">Order Review</Nav.Link>
            <Nav.Link className="nav_link" href="/inventory">Manage Inventory</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;