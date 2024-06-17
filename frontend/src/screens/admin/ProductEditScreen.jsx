import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Message, FormContainer, Loader } from '../../components';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useUploadProductImageMutation,
} from '../../slices/productApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const { data: product, isLoading, refetch, error } = useGetSingleProductQuery(productId);

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setImage(product.image);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        productId,
        name,
        price,
        brand,
        category,
        countInStock,
        description,
      };

      const { error } = await updateProduct(updatedProduct);

      if (error) return toast.error(error?.data?.message || error.message);

      toast.success('Product has been updated successfully.');
      navigate(`/admin/product-list`);
    } catch (err) {
      toast.error(err.data?.message || err.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData);
      console.log(res);
      toast.status(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Link to={'/admin/product-list'} className={'btn btn-light my-3'}>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>{error?.data?.message || error.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className={'my-2'} controlId={'name'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={'text'}
                name={'name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'price'}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type={'number'}
                step={0.01}
                name={'price'}
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'image'}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type={'text'}
                name={'image'}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className='mb-3'
              />
              <Form.Control
                type={'file'}
                name={'image'}
                label={'Upload image'}
                onChange={uploadFileHandler}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'brand'}>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type={'text'}
                name={'brand'}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'countInStock'}>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type={'number'}
                min={0}
                max={99}
                step={1}
                name={'countInStock'}
                value={countInStock}
                onChange={(e) => setCountInStock(+e.target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'description'}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type={'text'}
                name={'description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={'my-2'} controlId={'category'}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type={'text'}
                name={'category'}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant={'primary'} className={'mt-3'} disabled={loadingUpdate}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
