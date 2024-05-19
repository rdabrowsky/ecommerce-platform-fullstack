import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ data, ...props }) => {
  const { name, _id, image, price, rating, numReviews } = data;

  return (
    <Card className={'my-3 p-3 rounded'} {...props}>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant={'top'} />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`} title={name}>
          <Card.Title as={'div'} className={'product-title'}>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as={'div'}>
          <Rating value={rating} text={`${numReviews} review${numReviews > 1 ? 's' : ''}`} />
        </Card.Text>
        <Card.Text as={'h3'}>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
