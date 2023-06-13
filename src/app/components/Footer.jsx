"use client";
import React from "react";
import { Row, Col, Form, Input, Button, Typography, List } from "antd";
import { MailOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Image
              src="/Images/sardarlogo.svg"
              alt="Sardar Bikes Logo"
              width={150}
              height={50}
            />
          </Col>
          <Col span={6}>
            {/* <Typography.Title level={3}>Link List 1</Typography.Title> */}
            <List>
              <List.Item>
                <Link href="/">Countrywide delivery</Link>
              </List.Item>
              <List.Item>
                <Link href="/">Bikes</Link>
              </List.Item>
              <List.Item>
                <Link href="/">Booking Procedure</Link>
              </List.Item>
              <List.Item>
                <Link href="/">FAQ</Link>
              </List.Item>
              <List.Item>
                <Link href="/">Blogs</Link>
              </List.Item>
            </List>
          </Col>
          <Col span={6}>
            {/* <Typography.Title level={3}>Link List 2</Typography.Title> */}
            <List>
              <List.Item>
                <Link href="/">Terms & conditions</Link>
              </List.Item>
              <List.Item>
                <Link href="/">Privacy policy</Link>
              </List.Item>
              <List.Item>
                <Link href="/">Data protection</Link>
              </List.Item>
            </List>
          </Col>
          <Col span={6}>
            <Typography.Title level={3}>
              Get the news from us directly
            </Typography.Title>
            <Form>
              <Form.Item>
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Your email address"
                  style={{
                    padding: "10px 50px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "50px",
                    position: "relative",
                  }}
                />
                <Button
                  type="primary"
                  icon={
                    <RightOutlined
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  }
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "#d9d9d9",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                  }}
                />
              </Form.Item>
            </Form>

            <Typography.Title level={3}>
              Follow us on social media
            </Typography.Title>
            <div className="social-icons">
              <Link href="/">
                <Image
                  src="/Images/logo-facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/Images/logo-linkedin.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/Images/logo-twitter.svg"
                  alt="YouTube"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
