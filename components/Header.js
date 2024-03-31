import React, { useState } from "react";
import { Image, Menu, Dropdown, Avata, Avatar, Input } from "antd";
import Link from "next/link";
import { BarsOutlined, MenuFoldOutlined } from "@ant-design/icons";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menus = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Brands",
      link: "/brandpage",
    },
    {
      title: "Contact",
      link: "/contact",
    },
    {
      title: "Login",
      link: "/login",
    },
    {
      title: "Register",
      link: "/register",
    },
    {
      title: "Services",
      link: "/services",
    },
  ];

  return (
    <nav
      className="ViewContainer fixed"
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 6fr",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: "white",
      }}
    >
      <Image
        preview={false}
        src="/sardarlogo.svg"
        alt="Sardar Bikes Official Logo"
        width={200}
        height={50}
        style={{
          objectFit: "contain",
        }}
        onClick={() => {
          window.location.href = "/";
        }}
      />
      <div
        style={{
          display: mobileMenuOpen ? "grid" : "none",
          gridTemplateColumns: "3fr 2fr 1fr",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {menus.map((menu, index) => (
            <Link href={menu.link} key={index}>
              {menu.title}
            </Link>
          ))}
        </div>
        <Input.Search />
        <Avatar>
          <Image src="/user.png" alt="User Profile Picture" />
        </Avatar>
      </div>
      {/* )} */}
    </nav>
  );
};

export default Header;
