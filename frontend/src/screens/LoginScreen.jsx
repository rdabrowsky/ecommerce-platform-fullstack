import { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={'email'} className={'my-3'}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type={'email'}
            placeholder={'Enter email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId={'password'} className={'my-3'}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={'password'}
            placeholder={'Enter password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type={'submit'} variant={'primary'} className={'mt-2'} disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className={'py-3'}>
        <Col>
          New costumer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
