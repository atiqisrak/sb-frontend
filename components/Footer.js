import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Avata, Avatar, Input, Space } from "antd";
import Link from "next/link";
import {
  BarsOutlined,
  DownOutlined,
  FacebookFilled,
  FacebookOutlined,
  InstagramFilled,
  MailOutlined,
  MenuFoldOutlined,
  RightCircleFilled,
  SearchOutlined,
  TikTokFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = ({ darkmode }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const [socialMedia, setSocialMedia] = useState([
    {
      name: "Facebook",
      link: "https://www.facebook.com/sardarbikes",
      icon: FacebookFilled,
      color: "#1877f2",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/sardarbikes",
      icon: InstagramFilled,
      color: "#f46f30",
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/sardarbikes",
      icon: YoutubeFilled,
      color: "#ff0000",
    },
    {
      name: "TikTok",
      link: "https://www.tiktok.com/sardarbikes",
      icon: TikTokFilled,
      color: "#ee1d52",
    },
  ]);
  const handleHover = () => {
    setHovered(!hovered);
  };

  return (
    <div
      style={{
        borderTop: "1px solid var(--gray)",
        background: "var(--light-gray)",
        marginTop: "2em",
      }}
    >
      {/* 4 columns */}
      <div
        className="ViewContainer"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div>
          <Image
            preview={false}
            src="/sardarlogo.svg"
            alt="Sardar Bikes Official Logo"
            width={200}
            height={50}
            style={{
              cursor: "pointer",
              objectFit: "contain",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
        <div>
          <Menu
            mode="vertical"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0rem",
              background: "transparent",
              border: "none",
            }}
          >
            <Menu.Item
              key="1"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="/">Countrywide delivery</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="/products">Bikes</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">Booking Procedure</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">FAQ</Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">Blogs</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Menu
            mode="vertical"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0rem",
              background: "transparent",
              border: "none",
            }}
          >
            <Menu.Item
              key="1"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">Terms & conditions</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">Privacy Policy</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">Data Protection</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              style={{
                color: darkmode ? "white" : "var(--panther)",
                fontSize: "1.1em",
                fontWeight: "500",
              }}
            >
              <Link href="#">Cookies Policy</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h3>Get the news from us directly</h3>
          <Input
            prefix={
              <MailOutlined
                style={{
                  fontSize: "1.5em",
                  color: "var(--elephant)",
                  marginRight: "0.7em",
                }}
              />
            }
            placeholder="Enter your email"
            style={{
              width: "80%",
              padding: "0.8em 1.2em",
              borderRadius: "20px",
              border: "none",
              marginTop: "10px",
              border: "2px solid var(--gray)",
              boxShadow: "0 0 10px var(--gray)",
              fontSize: "0.9em",
            }}
          />
          <h3>Follow us on social media</h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "10px",
            }}
          >
            {socialMedia.map((social, index) => (
              <Link href={social.link} key={index}>
                <social.icon
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  style={{
                    color: social.color,
                    fontSize: "1.5em",
                    cursor: "pointer",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
