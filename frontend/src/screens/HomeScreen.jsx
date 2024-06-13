import { useGetProductsQuery } from '../slices/productApiSlice';
import { Col, Row } from 'react-bootstrap';
import { Product, Loader, Message } from '../components';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => {
              const { _id, ...rest } = product;

              return (
                <Col sm={12} md={6} lg={4} xl={3} key={_id}>
                  <Product data={{ ...rest, _id }} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
