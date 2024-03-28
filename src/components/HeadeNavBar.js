import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkLoggedInUser } from "../redux/features/users/userSlice";
import ProfileImageDefault from "../assets/profile/profile.jpg";
import Logo from "../assets/logos/logo.svg";
function HeaderNavBar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.users.setLoggedInStatus);
  const user = useSelector((state) => state.users.user);

  console.log(user);
  const cartItemCount = cartItems.length;
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loginUser");
  };
  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);
  const validateUser = localStorage.getItem("loginUser");
  console.log(validateUser);
  console.log("Header", isLoggedIn);
  const welcomeMessage = user ? (
    <span className="profile-block">
      <img src={ProfileImageDefault} alt="Profile Name" />
      <p className="profile-name">
        <i>Welcome</i>
        <b>{user.username}</b>
      </p>
    </span>
  ) : (
    <NavDropdown.Item href="#action/3.2">
      <Link to="/login" onClick={handleLogout}>
        Logout
      </Link>
    </NavDropdown.Item>
  );

  return (
    <>
      {validateUser ? (
        <Navbar
          collapseOnSelect
          expand="lg"
          className="bg-body-tertiary header-nav"
        >
          <Container>
            <Navbar.Brand href="#home" className="brand-logo-block">
              <img src={Logo} alt="Logo " />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/Home" activeClassName="active">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link activeClassName="active">
                  <Link to="/products" activeClassName="active">
                    Products
                  </Link>
                </Nav.Link>
                <Nav.Link activeClassName="active">
                  <Link to="/categories" activeClassName="active">
                    Categories
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse
              className="navbar-collapse-right"
              id="basic-navbar-nav"
            >
              <Nav>
                <Link to="/cart">
                  <div className="cart">
                    <span className="item-count">
                      <i className="cart-item-count"> {cartItemCount}</i>

                      <b>Cart</b>
                    </span>
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                </Link>
              </Nav>
              <Nav>
                <NavDropdown title={welcomeMessage} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.3">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/login">
                    <Link to="/login" onClick={handleLogout}>
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default HeaderNavBar;
