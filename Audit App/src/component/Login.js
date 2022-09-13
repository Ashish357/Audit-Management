import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    // console.warn(username, password);
    let credentials = { username: username, password: password };
    try {
      let result = await fetch("https://localhost:5001/api/Authorization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });
      result = await result.json();
      // console.log(result);
      if (result?.tokenString.length > 1) {
        localStorage.setItem("token", JSON.stringify(result?.tokenString));
        localStorage.setItem("userid", JSON.stringify(result?.userid));
        localStorage.setItem("username", JSON.stringify(result?.username));
        navigate("/checklist");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="text-center">Login Page</h1>
      <Form className="col-lg-4 offset-4 ">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
          />
          <Form.Text className="text-muted">Welcome to our new app</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <Button onClick={login} variant="primary offset-5">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
