import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
} from "react-bootstrap";
import Rating from "../Rating";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productsAction";
import Loader from "../Loader";
import Message from "../Message";

function ProductsScreen({ params }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails || {});
  const { error, loading, product = {} } = productDetails;
  const { id } = useParams();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

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
              <Image src={product.image} alt={product.product_name} fluid style={{maxWidth: '300px', height: '300px', objectFit: 'contain'}} />
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
                <ListGroup.Item>
                  <Button className="btn-block btn-success" disabled={product.stock_count === 0} type="button">
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>)}
      </div>
    </Container>
  );
}

export default ProductsScreen;
