"use client";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Space,
  Tag,
  message,
  Typography,
} from "antd";
const { Title } = Typography;
const { Option } = Select;

export default function ShopForm() {
  const {
    loggedIn,
    setLoggedIn,
    localLoggedIn,
    setLocalLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleLogin,
    handleLogout,
  } = useAuthContext();

  const router = useRouter();

  // states
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [owner, setOwner] = useState("");

  // Handlers
  const handleNameChange = (value) => {
    setName(value);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handleOwnerChange = (value) => {
    setOwner(value);
  };

  // Form Submit function
  const onFinish = async (values) => {
    console.log("Sending data....", values);

    const formData = {
      name,
      location,
      owner,
      createdAt: new Date(),
    };
    try {
      const response = await axios.post("/shops", formData);
      console.log("Shop added successfully. Shop info: ", response.data);
    } catch (error) {
      console.log("Error occured ", error.response?.data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFinish(event.target.elements);
  };

  return (
    <>
      {!loggedIn && (
        <div>
          <Title>You are not logged in.</Title>
        </div>
      )}
      {loggedIn && (
        <>
          <Title>Add Shop Form</Title>
          <div className="shopFormContainer">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: "90vw",
              }}
              onFinish={onFinish}
            >
              {/* Shop Name */}
              <Form.Item label="Shop Name" name="name">
                <Input onChange={(value) => handleNameChange(value)} />
              </Form.Item>
              <br />

              {/* Shop Location */}
              <Form.Item label="Shop Location" name="location">
                <Input onChange={(value) => handleLocationChange(value)} />
              </Form.Item>
              <br />

              {/* Shop Owner Name */}
              <Form.Item label="Shop Owner Name" name="owner">
                <Input onChange={(value) => handleOwnerChange(value)} />
              </Form.Item>
              <br />
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Create Shop
              </Button>
            </Form>
          </div>
        </>
      )}
    </>
  );
}
