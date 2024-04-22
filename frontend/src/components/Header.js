import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo');
  const linkCss = "text-decoration-none text-dark m-2";

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want LOGOUT?")) {
      localStorage.removeItem("aadhaar");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("id");
      navigate('/');
    }
  };
  
  return(
    <>
      <Navbar collapseOnSelect expand="lg"  className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
        <Navbar.Brand href="/">JVS</Navbar.Brand> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
          </Nav>
          <Nav>
            {
              userInfo ?
              <>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                <Link to="/editprofile" className={linkCss}>Edit Profile</Link>
              </>
              :
              <>
                <Link to="/login" className={linkCss}>Login</Link>
                <Link to="/register" className={linkCss}>Register</Link>
                <Link to="/about" className={linkCss}>About</Link>
              </>
            }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;
