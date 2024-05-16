import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ data, ...props }) => {
  const { name, _id, image, price } = data;

  return (
    <Card className={'my-3 p-3 rounded'} {...props}>
      <Link to={`/products/${_id}`}>
        <Card.Img src={image} variant={'top'} />
      </Link>
      <Card.Body>
        <Link to={`/products/${_id}`}>
          <Card.Title as={'div'}>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as={'h3'}>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
