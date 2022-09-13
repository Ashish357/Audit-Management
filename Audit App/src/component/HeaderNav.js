import React from "react";
import { Navbar, Container, Nav ,Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
function HeaderNav() {
  const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint
        
        localStorage.clear(); 
        navigate('/');
    }
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container >
        <Nav className="me-auto">
          <Nav.Link href="/checklist">CheckList Questions</Nav.Link>
          <Nav.Link href="/benchmark">Benchmark</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link >
          {localStorage.getItem("username").replaceAll('"',"")}
          </Nav.Link>
          <Button onClick={logout}>Sign Out</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
