"use client";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext, useAuthContext } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
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
  // If user is not signed in, redirect to sign in page
  useEffect(() => {
    if (!loggedIn) {
      router.push("/SignIn");
      console.log("Logged in status coming from Admin Dashboard: ", loggedIn);
      // return null;
    }
  }, [loggedIn, router]);

  useEffect(() => {
    async function fetchData() {
      const productRes = await fetch("/api/products");
      const productData = await productRes.json();
      setProductCount(productData.products.length);
      console.log("Products: ", productData.products.length);

      const userRes = await fetch("/api/auth");
      const userData = await userRes.json();
      setUserCount(userData.users.length);
      console.log("Users: ", userData.users.length);

      const categoryRes = await fetch("/api/categories");
      const categoryData = await categoryRes.json();
      setCategoryCount(categoryData.categories.length);
      console.log("Categories: ", categoryData.categories.length);
    }
    fetchData();
  }, []);

  return (
    <>
      <div style={{ padding: "30px" }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Products" bordered={false}>
              <h2>{productCount}</h2>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Users" bordered={false}>
              <h2>{userCount}</h2>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Categories" bordered={false}>
              <h2>{categoryCount}</h2>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            href="/ProductForm"
            style={{ marginRight: "10px" }}
          >
            Add Product
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            href="/AddShop"
          >
            Add Shop
          </Button>
        </div>

        <div style={{ marginTop: "40px" }}>
          <Button
            type="primary"
            size="large"
            style={{ background: "#F44336", color: "white", fontWeight: 500 }}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
