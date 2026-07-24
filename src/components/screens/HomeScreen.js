import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product";
import { listProducts } from "../../actions/productsAction";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Read search term from URL query parameter (?search=camera)
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("search") || "";

  const productList = useSelector((state) => state.productList || {});
  const { error, loading, products = [] } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Frontend filter logic applied on submit
  const filteredProducts = products.filter((product) => {
    if (!keyword) return true;

    const searchTerm = keyword.toLowerCase().trim();
    const nameMatch = product.product_name?.toLowerCase().includes(searchTerm);
    const brandMatch = product.product_brand
      ?.toLowerCase()
      .includes(searchTerm);
    const categoryMatch = product.product_category
      ?.toLowerCase()
      .includes(searchTerm);

    return nameMatch || brandMatch || categoryMatch;
  });

  return (
    <Container className="p-2" style={{ marginTop: "50px" }}>
      <h1>{keyword ? `Search Results for "${keyword}"` : "Products"}</h1>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {!loading && !error && filteredProducts.length === 0 && (
        <Message variant="info">No products found matching "{keyword}"</Message>
      )}

      <Row>
        {filteredProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomeScreen;
