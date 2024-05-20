import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import BackButton from '../components/BackButton';
import { useGetSingleProductQuery } from '../slices/productSlice';
import { useParams } from 'react-router-dom';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetSingleProductQuery(productId);
  return (
    <>
      <BackButton title={'Go Back'} />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant={'flush'}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} review${product.numReviews > 1 ? 's' : ''}`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Price: ${product.price}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className={'btn-block'}
                    type={'button'}
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
