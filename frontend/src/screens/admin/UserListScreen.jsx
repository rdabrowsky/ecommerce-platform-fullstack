import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { Message, Loader } from '../../components';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const {
    data: users,
    refetch,
    error: getUsersError,
    isLoading: loadingUsers,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);

        refetch();
        toast.success('User deleted successfully.');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        // await createProduct(); */
        toast.success('Product created successfully.');
        // refetch();
      } catch (err) {
        toast.success(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Row className={'align-items-center'}>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className={'text-end'}>
          <Button className={'btn-sm m-3'} onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {deleteUserLoading && <Loader />}
      {loadingUsers ? (
        <Loader />
      ) : getUsersError ? (
        <Message variant={'danger'}>
          {getUsersError?.data?.message || getUsersError.message}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className={'table-sm'}>
            <thead>
              <tr>
                <th>ID</th>
                <th>E-MAIL</th>
                <th>NAME</th>
                <th>IS ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const { _id, isAdmin, email, name } = user;
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{email}</td>
                    <td>{name}</td>
                    <td>{isAdmin ? <FaCheck color={'green'} /> : <FaTimes color={'red'} />}</td>
                    <td>
                      <LinkContainer to={`/admin/user/${_id}/edit`}>
                        <Button variant={'light'} className={'btn-sm mx-2'}>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        className={'btn-sm mx-2'}
                        variant={'danger'}
                        onClick={() => deleteHandler(_id)}
                      >
                        <FaTrash color={'white'} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
export default UserListScreen;
