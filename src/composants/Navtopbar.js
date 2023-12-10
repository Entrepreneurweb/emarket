import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


function CustomNavbar(props) {
  const [expanded, setExpanded] = useState(false);
  const [triarg, settriarg]=useState("");

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar expand="lg" expanded={expanded} bg="info" variant="light">
      <Container>
        <Navbar.Brand href="#">E-MARKET235</Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            
            <NavDropdown title="TRIER" id="basic-nav-dropdown">
            <NavDropdown.Item ><div onClick={()=> props.onClick("") } > TOUT </div></NavDropdown.Item>
              <NavDropdown.Item > <div onClick={()=> props.onClick("vetement") } > VESTIMENTAIRE </div></NavDropdown.Item>
              <NavDropdown.Item ><div onClick={()=> props.onClick("electronique") } > ELECTRONIQUE </div></NavDropdown.Item>
              <NavDropdown.Item ><div onClick={()=> props.onClick("autres") } > AUTRES </div></NavDropdown.Item>
              
              <NavDropdown.Divider />
              
            </NavDropdown>
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
