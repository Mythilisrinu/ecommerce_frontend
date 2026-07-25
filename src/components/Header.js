import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Use useHistory if using react-router-dom v5
import { logout } from "../actions/userActions";

function Header() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg p-2" fixed="top">
        <div className="container-fluid">
          <LinkContainer to="/">
            <Nav.Link className="navbar-brand">Ecommerce Cart </Nav.Link>
          </LinkContainer>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <LinkContainer to="/">
                  <Nav.Link className="nav-link ">Home </Nav.Link>
                </LinkContainer>
                <span className="visually-hidden">(current)</span>
              </li>
              <li className="nav-item">
                <LinkContainer to="/cart">
                  <Nav.Link className="nav-link">Cart</Nav.Link>
                </LinkContainer>
              </li>
              {!userInfo && (
                <li className="nav-item dropdown">
                  <LinkContainer to="/user">
                    <Nav.Link
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      New User ?
                    </Nav.Link>
                  </LinkContainer>
                  <div className="dropdown-menu bg-dark">
                    <LinkContainer to="/login">
                      <Nav.Link className="dropdown-item">Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <Nav.Link className="dropdown-item">Signup</Nav.Link>
                    </LinkContainer>
                  </div>
                </li>
              )}
              {userInfo && (
                <li>
                  <Nav.Link className="nav-link" onClick={logoutHandler}>
                    Logout
                  </Nav.Link>
                </li>
              )}
            </ul>

            {/* SEARCH FORM */}
            <form onSubmit={submitHandler} className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
