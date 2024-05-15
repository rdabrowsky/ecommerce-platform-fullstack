import { Col, Row } from 'react-bootstrap';
import { products } from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
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
  );
};

export default HomeScreen;
