"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { siteConstants } from "../global/constants/datasource";
import { Row, Table, Typography, Column, Card, Col, Tabs, Button } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { RightOutlined } from "@ant-design/icons";
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

  const MAX_TITLE_LENGTH = 12;

  // Generate a row for each product group
  const rows = productGroups.map((group, index) => (
    <Row key={`row${index}`} gutter={[16, 8]}>
      {group.map((product) => (
        <Col key={product._id} span={8}>
          <div
            className="productCard"
            style={{
              // width: "16em",
              padding: "1rem 0.4rem",
              margin: "1rem",
              backgroundColor: "#F6F8F8",
              borderRadius: "2.4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={"/Images/" + product.image}
                width={280}
                height={190}
                alt="Product Picture"
                // unoptimized="true"
              />
            </div>

            <div
              className="prodDescription"
              style={{
                display: "flex",
                alignItems: "space-between",
                justifyContent: "space-between",
                margin: "0 0.5em 0 2rem",
                gap: "2rem",
                // width: "3em",
              }}
            >
              <div className="prodDesLeft">
                <Title
                  level={5}
                  style={{
                    height: "3em",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {/* {product.description.brand.length +
                    product.description.model.length >
                  MAX_TITLE_LENGTH
                    ? `${product.description.brand} ${product.description.model}`.slice(
                        0,
                        MAX_TITLE_LENGTH
                      ) + "..."
                    : `${product.description.brand} ${product.description.model}`} */}
                  {product.description.brand} {product.description.model}
                  {/* {product.description.model} */}
                </Title>
                <Paragraph
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#8E8E8E",
                  }}
                >
                  {product.description.mileage} KM
                </Paragraph>
                <Paragraph
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      color: "#ff733b",
                    }}
                  >
                    ৳
                  </span>{" "}
                  {formatNumberWithCommas(product.offerPrice)}
                </Paragraph>
              </div>
              <div
                className="prodDesRight"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <RightOutlined
                    style={{
                      fontSize: "1.5rem",
                      color: "#ff733be6",
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  ));

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `All`,
      children: rows,
    },
    {
      key: "2",
      label: `125`,
      children: rows,
    },
    {
      key: "3",
      label: `150`,
      children: rows,
    },
    {
      key: "4",
      label: `155`,
      children: rows,
    },
    {
      key: "5",
      label: `165`,
      children: rows,
    },
  ];
  const tabs = <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

  return (
    <>
      <div className="galleryContainer">
        <div
          className="titles"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5rem",
          }}
        >
          <Title
            autoSize={true}
            level={1}
            style={{
              color: "#ff733b",
              fontSize: "3rem",
              fontWeight: 600,
              lineHeight: "1.2rem",
              zIndex: 1,
            }}
          >
            Explore
          </Title>
          <Title
            autoSize={true}
            level={1}
            style={{
              color: "#7b7b7b20",
              fontSize: "5rem",
              fontWeight: 600,
              lineHeight: "1.2rem",
              position: "absolute",
              marginTop: "-1.2rem",
            }}
          >
            Explore
          </Title>
          <Paragraph
            style={{
              paddingTop: "1rem",
              fontFamily: "Poppins",
              color: "#7b7b7b",
              fontSize: "1.2rem",
              fontWeight: 400,
              lineHeight: "1.2rem",
              letterSpacing: "0.2rem",
            }}
          >
            The best & favourite bikes
          </Paragraph>
        </div>
        <div
          className="productGallery"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {tabs}
        </div>
      </div>
    </>
  );
}
