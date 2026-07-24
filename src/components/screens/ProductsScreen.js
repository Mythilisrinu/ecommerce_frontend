import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
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
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productsAction";
import Loader from "../Loader";
import Message from "../Message";

function ProductsScreen({ params }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails || {});
  const { error, loading, product = {} } = productDetails;
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={4}>
              <Image
                src={product.image}
                alt={product.product_name}
                fluid
                style={{
                  maxWidth: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            </Col>
            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.product_name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.num_reviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Brand: {product.product_brand}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: {product.product_info}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stock_count > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.stock_count > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="py-1"
                          >
                            {[...Array(product.stock_count).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block btn-success"
                      disabled={product.stock_count === 0}
                      type="button"
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
      </div>
    </Container>
  );
}

export default ProductsScreen;
