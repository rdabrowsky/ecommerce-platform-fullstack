import { Navbar, Nav, Container, NavbarToggle, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

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
              <LinkContainer to={'/login'}>
                <Nav.Link>
                  <FaUser />
                  Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
