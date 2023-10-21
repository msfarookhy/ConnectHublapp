import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Card from 'react-bootstrap/Card';

function Header() {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  };


  let user;
  if (localStorage.getItem("token")) {
    const userToken = localStorage.getItem("token");
    user = jwt_decode(userToken);
  }

  return (
    <div>
      <Container>
        <div
          className="justify-content-end"
          style={{ display: "flex", alignItems: "center" }}
        >
          {isAuthenticated ? (
            <>
              <Button variant="outline-dark" onClick={handleLogout}>
                Logout
              </Button>
              <span style={{ marginRight: "20px" }}></span>

              {user && (
                <Button
                  variant="outline-dark"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "20%",
                    width: "264px",
                    Height: "440px",
                  }}
                >
                  <FontAwesomeIcon icon={faUserCircle} />

                  <div style={{ fontWeight: "bold" }}>{user.user.name}</div>
                  <div>{user.user.email}</div>
                </Button>
              )}
            </>
          ) : (
            <div className="centered-card">
              <Card className="bg-transparent text-light">
                <Card.Body>
                  <Card.Title>Please Log In To View Content</Card.Title>
                  <Button variant="outline-light" style={{ width: "100%" }}>
                    <Link to="/login" className="text-decoration-none">
                      LOGIN
                    </Link>
                  </Button>
                  <span style={{ marginRight: '20px' }}></span>
                  <Button variant="outline-light" style={{ width: "100%" }}>
                    <Link to="/signup" className="text-decoration-none">
                      Sign Up
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Header;
