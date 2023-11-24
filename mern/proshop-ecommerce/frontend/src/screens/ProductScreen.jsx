import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

function ProductScreen() {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product.data, qty }));
    navigate('/cart');
  };

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
          {/* Go back button */}
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>

          <Row>
            {/* Image */}
            <Col md={5}>
              <Image src={product.data.image} alt={product.data.name} fluid />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                {/* Product name */}
                <ListGroup.Item>
                  <h3>{product.data.name}</h3>
                </ListGroup.Item>

                {/* Reviews */}
                <ListGroup.Item>
                  <Rating
                    value={product.data.rating}
                    text={`${product.data.numReviews} reviews`}
                  />
                </ListGroup.Item>

                {/* Price 1 & description */}
                <ListGroup.Item>Price: ${product.data.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.data.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  {/* Price 2 */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>${product.data.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Status */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {product.data.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.data.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.data.countInStock).keys()].map(
                              (count) => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {/* Add to cart button */}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={addToCartHandler}
                      disabled={product.data.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
