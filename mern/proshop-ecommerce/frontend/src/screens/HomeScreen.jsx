import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';
import Product from '../components/Product';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>

          {/* Display each product */}
          <Row>
            {products.data.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
