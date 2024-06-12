import { Navbar, Nav, Container, NavbarToggle, Badge, NavDropdown } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersSlice';
import { logout } from '../slices/authSlice';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg={'dark'} variant={'dark'} expand={'md'} collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand href={'/'}>
              <img src={logo} alt={'ProShop logo'} />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <NavbarToggle aria-controls={'basic-navbar-nav'} />
          <Navbar.Collapse id={'basic-navbar-nav'}>
            <Nav className={'ms-auto'}>
              <LinkContainer to={'/cart'}>
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg={'success'} style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id={'username'}>
                    <LinkContainer to={'/profile'}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    <FaUser />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={'Admin'} id={'admin-menu'}>
                  <LinkContainer to={'/admin/product-list'}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={'/admin/user-list'}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={'/admin/order-list'}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
