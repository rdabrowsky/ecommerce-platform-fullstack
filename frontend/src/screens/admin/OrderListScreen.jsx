import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Message, Loader } from '../../components';
import { convertedDate } from '../../utils/convertedDate';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error?.data?.message || error.message}</Message>
      ) : (
        <Table striped bordered hover responsive className={'table-sn'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { _id, createdAt, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, user } =
                order;
              return (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{user ? user.name : '-'}</td>
                  <td>{convertedDate(createdAt)}</td>
                  <td>{totalPrice}</td>
                  <td>{isPaid ? convertedDate(paidAt) : <FaTimes color={'red'} />}</td>
                  <td>{isDelivered ? convertedDate(deliveredAt) : <FaTimes color={'red'} />}</td>
                  <td>
                    <LinkContainer to={`/order/${_id}`}>
                      <Button className={'btn-sm'}>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
