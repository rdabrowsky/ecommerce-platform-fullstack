import { Card } from 'react-bootstrap';

const Product = ({ data, ...props }) => {
  const { name, _id, image, price } = data;

  return (
    <Card className={'my-3 p-3 rounded'} {...props}>
      <a href={`/products/${_id}`}>
        <Card.Img src={image} variant={'top'} />
      </a>
      <Card.Body>
        <a href={`/products/${_id}`}>
          <Card.Title as={'div'}>
            <strong>{name}</strong>
          </Card.Title>
        </a>
        <Card.Text as={'h3'}>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
