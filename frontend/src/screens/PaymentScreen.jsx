import { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import { CheckoutsSteps, FormContainer } from '../components';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  return (
    <FormContainer>
      <CheckoutsSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={'address'} className={'my-2'}>
          <Form.Label as={'legend'}>{'Select Method'}</Form.Label>
          <Col>
            <Form.Check
              type={'radio'}
              className={'my-2'}
              label={'Paypal or Credit Card'}
              id={'PayPal'}
              name={'paymentMethod'}
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant={'primary'} type={'submit'}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
