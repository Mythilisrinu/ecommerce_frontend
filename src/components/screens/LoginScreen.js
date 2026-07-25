import React, { use, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { InputGroup } from "react-bootstrap";
import { validPassword } from "./Regex";
import { login } from "../../actions/userActions";
function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [showPass1, setShowPass1] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, pass1));
  };

  return (
    <>
      <Container className="p-2">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header
                as="h3"
                className="text-center bg-black text-light mb-1"
                style={{ fontSize: "1.1rem" }}
              >
                Login
              </Card.Header>
              <Card.Body className="pt-1 py-1.5">
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label className="small">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      required
                      className="p-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="password">
                    <Form.Label className="small">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Checkbox
                        checked={showPass1}
                        onChange={() => setShowPass1(!showPass1)}
                      />
                      <Form.Control
                        type={showPass1 ? "text" : "password"}
                        placeholder="Enter your Password"
                        value={pass1}
                        required
                        className="p-1"
                        onChange={(e) => setPass1(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid mt-3">
                    <Button
                      className="btn btn-md btn-success p-1.5"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            {error && <Message variant="danger">{error}</Message>}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
