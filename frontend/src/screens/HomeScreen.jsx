import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };

    fetchProducts().catch((error) => console.error('Error in fetchProducts:', error));
  }, []);

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
