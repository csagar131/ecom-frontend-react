import { React, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate } from "../auth/helper/index";

export default function Signup(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: false,
    success: false,
    message: "",
    didRedirect: false,
  });

  const { email, password } = value;
  const handleChange = (evt) => {
    setValue({
      ...value,
      [evt.target.name]: evt.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: true,
        message: "Please fill all the details",
      });
      return value.message;
    }

    setLoading(true);
    await signin({ email, password })
      .then((data) => {
        if(data.token){
            authenticate(data.token)
            setValue({
                email: "",
                password: "",
                error: false,
                success: true,
                message: "Login Success",
              });
        }else{
            //TODO: handle to already session exist
        }
        
        history.push("/");
      })
      .catch((err) => {
        setValue({
          ...value,
          error: true,
          success: false,
          message: "SignUp Failed",
        });
        return value.message;
      });

    setLoading(false);
  }


  function htmlForm() {
    return (
      <Card
        style={{
          margin: "0 auto",
          minWidth: "400px",
          maxWidth: "400px",
          boxSizing: "border-box",
          marginTop: "50px",
        }}
      >
        <Card.Body style={{ color: "black" }}>
          <h2 className="text-center  mb-4">Log In</h2>
          {value.error && <Alert variant="danger">{value.message}</Alert>}
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={value.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={value.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            disabled={loading}
            className="w-100"
            type="submit"
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Base>
      {htmlForm()}
      <div className="W-100 text-center mt-2" style={{ color: "white" }}>
        Don't have an account? <Link to="/signup"> Sign Up </Link>
      </div>
      <p className="text-center text-white">{JSON.stringify(value)}</p>
    </Base>
  );
}
