import { Alert, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MOVIE_PATH } from "../routes/paths";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate(`${MOVIE_PATH}`);
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    dispatch(loginStart());

    setTimeout(() => {
      if (
        formData.email === "test@example.com" &&
        formData.password === "password123"
      ) {
        const userData = {
          email: formData.email,
          name: "Test User",
        };
        dispatch(loginSuccess(userData));
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
        navigate(`${MOVIE_PATH}`);
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    }, 1000);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Sign in to your account</h2>
      {error && <Alert message={error} type="error" />}

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        style={{ width: 400 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ width: 100 }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
