import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaTrash } from 'react-icons/fa';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap';

import { addToCart, removeFromCart } from '../slices/cartSlice';

import Message from '../components/Message';

const cartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      {/* Cart item details */}
      <Col md={8}>
        <h1 style={{ marginBotton: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup varient="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  {/* Show product thumbnail */}
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  {/* Link to each product */}
                  <Col md={3}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </Col>

                  {/* Show product price */}
                  <Col md={2}>${item.price}</Col>

                  {/* Change quantity buttons */}
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        addToCartHandler(item, Number(e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((count) => (
                        <option key={count + 1} value={count + 1}>
                          {count + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  {/* Delete item from cart button */}
                  <Col md={2}>
                    <Button
                      type="button"
                      varient="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      {/* Cart price overview */}
      <Col md={4}>
        <Card>
          <ListGroup varient="flush">
            <ListGroup.Item>
              {/* Quantity of items in cart */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {/* Total price of items */}$
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>

            {/* Proceed to checkout button */}
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default cartScreen;
