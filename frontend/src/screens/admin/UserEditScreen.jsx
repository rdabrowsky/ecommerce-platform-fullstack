import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Message, FormContainer, Loader, BackButton } from '../../components';
import { toast } from 'react-toastify';

import { useGetUserByIdQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = { userId, name, email, isAdmin };
      console.log(updatedUser);
      const { error } = await updateUser(updatedUser);

      if (error) return toast.error(error?.data?.message || error.message);

      toast.success('User has been updated successfully.');
      navigate(`/admin/user-list`);
    } catch (err) {
      toast.error(err.data?.message || err.message);
    }
  };

  return (
    <>
      <BackButton url={'/admin/user-list'} />
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>{error?.data?.message || error.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className={'my-2'} controlId={'name'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={'text'}
                name={'name'}
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'email'}>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type={'email'}
                name={'email'}
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'is-admin'}>
              <Form.Label>Check if user should be admin</Form.Label>
              <Form.Check
                type={'switch'}
                name={'is-admin'}
                checked={isAdmin}
                onChange={({ target }) => setIsAdmin(Boolean(target.checked))}
                className='mb-3'
              />
            </Form.Group>
            <Button type='submit' variant={'primary'} className={'mt-3'} disabled={loadingUpdate}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
