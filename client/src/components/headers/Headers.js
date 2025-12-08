import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <i class="fa-solid fa-staff-snake"></i>&nbsp;HSLMS
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/analyse">
              Analyse
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
