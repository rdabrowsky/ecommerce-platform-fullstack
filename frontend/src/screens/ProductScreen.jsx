import { useState } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Loader, Rating, BackButton, Message } from '../components';
import { useGetSingleProductQuery } from '../slices/productApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetSingleProductQuery(productId);
  const [itemQuantity, setItemQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: itemQuantity }));
    navigate('/cart');
  };

  return (
    <>
      <BackButton title={'Go Back'} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
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
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={itemQuantity}
                          onChange={({ target }) => setItemQuantity(+target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((key) => (
                            <option key={key + 1} value={key + 1}>
                              {key + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className={'btn-block'}
                    type={'button'}
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
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
