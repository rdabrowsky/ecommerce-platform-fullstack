import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Message, Loader } from '../../components';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const {
    data: products,
    isLoading: getProductsLoading,
    error: getProductsError,
    refetch,
  } = useGetProductsQuery();
  const [createProduct, { isLoading: createProductLoading }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted successfully.');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        toast.success('Product created successfully.');
        refetch();
      } catch (err) {
        toast.success(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Row className={'align-items-center'}>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className={'text-end'}>
          <Button className={'btn-sm m-3'} onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {(createProductLoading || deleteProductLoading) && <Loader />}
      {getProductsLoading ? (
        <Loader />
      ) : getProductsError ? (
        <Message variant={'danger'}>
          {getProductsError?.data?.message || getProductsError.message}
        </Message>
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
