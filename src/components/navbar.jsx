import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import NavLogo from "../data/Navbar_conex_logo.png"

import MailIcon from '@mui/icons-material/Mail';
import "./Nav.styles.css"
import { Badge } from "@mui/material";

function NavBarComponent() {
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav-primay"
      // background-color="#2b3390"
      data-bs-theme="#2b3390"
      style={{background: "#2b3390"}}
    >
      <Container fluid style={{marginLeft: "1rem", marginRight: "1rem"}}>
        <Navbar.Brand
          style={{ cursor: "pointer", color: "white", fontWeight: "700", fontSize: "24px" }}
          onClick={() => navigate("/clients")}
        >
          <img
              alt="logo"
              src={NavLogo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
          Conex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              style={{ cursor: "pointer", color: "white", marginTop: "auto", marginBottom: "auto" }}
              onClick={() => navigate("/clients")}
            >
              Company
            </Nav.Link>
            <Nav.Link
              style={{ cursor: "pointer", color: "white"  }}
              onClick={() => navigate("/attendants")}
            >
              Attendant
            </Nav.Link>
            <Nav.Link
              style={{ cursor: "pointer", color: "white"  }}
              onClick={() => navigate("/vouchers")}
            >
              Vouchers
            </Nav.Link>
            <Nav.Link
              style={{ cursor: "pointer", color: "white"  }}
              onClick={() => navigate("/transactions")}
            >
              Transactions
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link color="none"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => navigate("/chats")}
            >
              <Badge >
                <MailIcon fontSize="medium"/>
              </Badge>
            </Nav.Link>
            <Navbar.Text className="d-lg-none">
              <Nav.Link
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => navigate("/login")}
              >
                Logout
              </Nav.Link>
            </Navbar.Text>
            <Dropdown align="end" className="d-none d-lg-flex" >
              <Dropdown.Toggle
                id="dropdown-profile"
                style={{ background: "none", border: "none" }}
              >
                <AccountCircleRoundedIcon fontSize="large" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogout()}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
