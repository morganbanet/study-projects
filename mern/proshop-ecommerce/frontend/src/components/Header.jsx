import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

import logo from '../assets/logo.png';
import authSlice from '../slices/authSlice';

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/* Logo links to index page */}
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img src={logo} alt="ProShop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* "Cart" links to cart */}
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* Sign In / User Nav Menu */}
              {userInfo ? (
                <NavDropdown title={userInfo.data.name} id="username">
                  {/* Profile Link */}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  {/* Logout Button */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
