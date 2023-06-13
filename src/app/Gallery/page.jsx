"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { siteConstants } from "../global/constants/datasource";
import { Row, Table, Typography, Column, Card, Col } from "antd";
const { Title, Paragraph } = Typography;
const { Meta } = Card;

export default function Gallery() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        // const fData = data.products;
        const sortedProducts = data.products.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Sort in descending order
        });
        setProducts(sortedProducts);
        // setProducts(fData);
        console.log("Products loaded:", sortedProducts); // Log data in console
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Limit products to 9 items
  const limitedProducts = products.slice(0, 9);

  // Split products into groups of 3
  const productGroups = [];
  for (let i = 0; i < limitedProducts.length; i += 3) {
    productGroups.push(limitedProducts.slice(i, i + 3));
  }

  // Custom formatting function for adding commas
  const formatNumberWithCommas = (number) => {
    const str = number.toString();
    const length = str.length;
    let formattedNumber = "";

    if (length <= 2) {
      formattedNumber = str;
    } else if (length === 3) {
      formattedNumber = `${str[0]},${str.slice(1)}`;
    } else if (length === 4) {
      formattedNumber = `${str.slice(0, 2)},${str.slice(2)}`;
    } else if (length === 5) {
      formattedNumber = `${str.slice(0, 2)},${str.slice(2, 5)}`;
    } else if (length >= 6) {
      formattedNumber = `${str.slice(0, 1)},${str.slice(1, 3)},${str.slice(
        3,
        6
      )}`;
    }

    return formattedNumber;
  };

  // Generate a row for each product group
  const rows = productGroups.map((group, index) => (
    <Row key={`row${index}`} gutter={[16, 16]}>
      {group.map((product) => (
        <Col key={product._id} span={8}>
          <div>
            <Title level={5}>
              {product.description.brand} {product.description.model}
            </Title>
            <Image
              src={"/Images/" + product.image}
              width={200}
              height={100}
              alt="Product Picture"
              // unoptimized="true"
            />
            <Paragraph>{product.description.mileage} KM</Paragraph>
            <Paragraph>
              ৳ {formatNumberWithCommas(product.offerPrice)}
            </Paragraph>
          </div>
        </Col>
      ))}
    </Row>
  ));

  return (
    <>
      <Title autoSize={true} level={2}>
        Explore
      </Title>
      <Paragraph>The best & favourite bikes</Paragraph>
      {/* <Image
        src="/Images/promo.png"
        alt="Promotional Campaign"
        width={1440}
        height={810}
        className="promoCampDesk"
      /> */}
      <div>{rows}</div>
    </>
  );
}
