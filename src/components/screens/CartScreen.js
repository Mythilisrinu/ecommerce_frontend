import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

function CartScreen({ params }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = id;
  const qty = Number(searchParams.get("qty")) || 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <Container>
            <h1>Cart Items</h1>
            {cartItems.length === 0 ? (
              <Message variant="info">
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.product_name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3} className="pt-4">
                        <Link
                          to={`/product/${item.product}`}
                          className="mt-auto"
                        >
                          {item.product_name}
                        </Link>
                      </Col>
                      <Col md={2} className="pt-4">
                        ${item.price}
                      </Col>
                      <Col md={3} className="pt-4">
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value)),
                            )
                          }
                        >
                          {[...Array(item.stock_count).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={1} className="pt-4">
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default CartScreen;
