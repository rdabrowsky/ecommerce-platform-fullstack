import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader, Message } from '../components';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

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
      <Col md={9}>Col</Col>
    </Row>
  );
};

export default ProfileScreen;
