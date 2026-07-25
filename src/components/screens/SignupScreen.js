import React, { use, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { InputGroup } from "react-bootstrap";
import { validPassword } from "./Regex";
import { signup } from "../../actions/userActions";

function SignupScreen() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [errorMsg, setError] = useState("");
  const [info, setInfo] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      // navigate("/");
      setInfo(userInfo.details);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setError("Password do not match");
      navigate("/signup");
    } else if (!validPassword.test(pass1)) {
      setError("Password Criteria does not match");
    } else {
      dispatch(signup(fname, lname, email, pass1));
      // navigate("/login");
    }
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
                Sign up
              </Card.Header>
              <Card.Body className="pt-1 py-1.5">
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-2" controlId="fname">
                    <Form.Label className="small">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your First Name"
                      value={fname}
                      required
                      className="p-1"
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="lname">
                    <Form.Label className="small">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Last Name"
                      value={lname}
                      required
                      className="p-1"
                      onChange={(e) => setlname(e.target.value)}
                    />
                  </Form.Group>
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
                  <Form.Group className="mb-2" controlId="password">
                    <Form.Label className="small">Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Checkbox
                        checked={showPass2}
                        onChange={() => setShowPass2(!showPass2)}
                      />
                      <Form.Control
                        type={showPass2 ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={pass2}
                        required
                        className="p-1"
                        onChange={(e) => setPass2(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid mt-2.5">
                    <Button
                      className="btn btn-md btn-success p-1.5"
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="m-auto">
            {error && <Message variant="danger">{error}</Message>}
            {errorMsg && <Message variant="danger">{errorMsg}</Message>}
            {info ? (
              <Message variant="success">{info}</Message>
            ) : (
              <Message variant="primary">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one digit, and one special character.
              </Message>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupScreen;
