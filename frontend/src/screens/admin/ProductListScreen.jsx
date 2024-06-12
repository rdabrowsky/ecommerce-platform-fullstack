import { useGetProductsQuery } from '../../slices/productSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { Message, Loader } from '../../components';

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const deleteHandler = (productId) => {
    console.log(productId);
  };

  return (
    <>
      <Row className={'align-items-center'}>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className={'text-end'}>
          <Button className={'btn-sm m-3'}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error?.data?.message || error.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className={'table-sm'}>
            <thead>
              <tr>
                <th>ID</th>
                <th>FULL NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const { _id, brand, price, category, name } = product;
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${_id}/edit`}>
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
export default ProductListScreen;
