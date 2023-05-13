"use client";
import { useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography } from "antd";
import { AuthContext, AuthProvider } from "../global/contexts/AuthContext";

const { Title } = Typography;

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  // const [loggedIn, setLoggedIn] = useState();
  // const [localLoggedIn, setLocalLoggedIn] = useState();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: {
            span: 30,
          },
          wrapperCol: {
            span: 30,
          },
        }
      : null;

  const router = useRouter();
  const { loggedIn, handleLogin } = useContext(AuthProvider);

  // Check local storage for sign-in status on page load
  useEffect(() => {
    const localSignInStatus = localStorage.getItem("loggedIn");
    // console.log(handleLogin);
    if (localSignInStatus) {
      setLoggedIn(true);
      router.push("/AdminDashboard");
      console.log("Logged in status : ", loggedIn);
      console.log("Already signed in.");
    } else {
      console.log("Logged in status : ", loggedIn);
    }
  }, []);

  const onFinish = async (values) => {
    const formData = {
      contactNumber: values.contactNumber,
      password: values.password,
    };
    try {
      const response = await axios.post("/auth/signin", formData);
      console.log(response.data);

      handleLogin(); // set loggedIn and loggedIn to true

      router.push("/AdminDashboard");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

<div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
          size="large"
          onFinish={onFinish}
          style={{
            maxWidth: "80vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title level={3}>Sign In</Title>
          <Form.Item
            label="Phone Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input your contact number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {errorMessage && (
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Alert message={errorMessage} type="error" />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>