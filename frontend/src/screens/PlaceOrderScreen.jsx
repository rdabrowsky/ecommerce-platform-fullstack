import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { CheckoutsSteps, Message, Loader } from '../components';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { address, city, postalCode, country } = cart.shippingAddress;

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  return (
    <div>
      <CheckoutsSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant={'flush'}>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city}, {postalCode}, {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method: </h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items: </h2>
              <p>
                <strong>Method: </strong>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant={'flush'}>
                    {cart.cartItems.map((item) => {
                      return (
                        <ListGroup.Item key={item._id}>
                          <Row>
                            <Col md={1}>
                              <Image fluid rounded src={item.image} alt={item.name} />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>Column</Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
