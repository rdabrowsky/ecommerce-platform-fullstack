import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader, Message } from '../components';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice';
import { FaTimes } from 'react-icons/fa';
import { convertedDate } from '../utils/convertedDate';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Password doesn't match");

    try {
      const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
      dispatch(setCredentials(res));

      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId={'name'} className={'mb-2'}>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type={'name'}
              placeholder={'Enter name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId={'email'} className={'mb-2'}>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type={'email'}
              placeholder={'Enter email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId={'password'} className={'mb-2'}>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type={'password'}
              placeholder={'Enter password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId={'confirmationPassword'} className={'mb-2'}>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type={'password'}
              placeholder={'Confirm password confirmation'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type={'submit'} variant={'primary'}>
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders:</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={'error'}>{error?.data?.message || error.error}</Message>
        ) : (
          <Table striped hover responsive className={'table-sm'}>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const { _id, createdAt, totalPrice, isPaid, isDelivered, paidAt, deliveredAt } =
                  order;

                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{convertedDate(createdAt)}</td>
                    <td>${totalPrice}</td>
                    <td>{isPaid ? convertedDate(paidAt) : <FaTimes style={{ color: 'red' }} />}</td>
                    <td>
                      {isDelivered ? (
                        convertedDate(deliveredAt)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${_id}`}>
                        <Button variant={'primary'} className={'btn-sm'}>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
