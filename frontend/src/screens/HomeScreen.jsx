import { useGetProductsQuery } from '../slices/productSlice';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(error);
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
