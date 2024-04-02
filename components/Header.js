import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Avata, Avatar, Input, Space, Switch } from "antd";
import Link from "next/link";
import {
  BarsOutlined,
  DownOutlined,
  MenuFoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = ({ darkmode }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [brandNames, setBrandNames] = useState([]);
  const [brandSlugs, setBrandSlugs] = useState();
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [niloyOpen, setNiloyOpen] = useState(false);
  const handleBrandsHover = () => {
    setBrandsOpen(!brandsOpen);
  };
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
      title: "All Bikes",
      link: "/products",
    },
  ];

  useEffect(() => {
    localStorage.getItem("brandData") &&
      setBrandData(JSON.parse(localStorage.getItem("brandData")));
  }, []);

  const brandMenu = (
    <Menu>
      {brandData?.slice(0, 15)?.map((brand, index) => (
        <div key={index}>
          <Menu.Item
            onClick={() => {
              // router.push(`/brandpage/${brand?.oemSlug}`);
              window.location.href = `/brandpage/${brand?.oemSlug}`;
            }}
          >
            {brand?.oem}
          </Menu.Item>
        </div>
      ))}
      {/* <Link href="/brandpage">All Brands</Link> */}
      <Menu.Item
        onClick={() => {
          window.location.href = "/brandpage";
        }}
      >
        All Brands
      </Menu.Item>
    </Menu>
  );

  return (
    <nav
      className="fixed"
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 6fr",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: darkmode ? "#0d0d0d" : "#fff",
        position: "fixed",
        top: 0,
        zIndex: 100,
        // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        boxShadow: darkmode ? "0 2px 5px #ffffff20" : "0 2px 5px #00000020",
      }}
    >
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
            fontSize: "1.2em",
            fontWeight: "bold",
          }}
        >
          <Menu
            mode="horizontal"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              background: "transparent",
              border: "none",
            }}
          >
            {menus.map((menu, index) => (
              <Menu.Item
                key={index}
                style={{
                  color: darkmode ? "#ffffff" : "#333",
                }}
              >
                {menu?.title === "Brands" ? (
                  <Dropdown overlay={brandMenu}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {menu.title} <DownOutlined />
                    </a>
                  </Dropdown>
                ) : (
                  <Link href={menu.link}>{menu.title}</Link>
                )}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <Input
          prefix={
            <SearchOutlined
              style={{
                fontSize: "1.5em",
                color: "var(--tiger)",
              }}
            />
          }
          placeholder="Search for Bikes"
          style={{
            width: "100%",
            borderRadius: "20px",
            border: "2px solid var(--transparent-tiger)",
            padding: "0.5em 1rem",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Image
            src="/images/avatar.png"
            alt="User Profile Picture"
            width={40}
            height={40}
            style={{
              cursor: "pointer",
              objectFit: "contain",
            }}
            onClick={() => {
              setNiloyOpen(!niloyOpen);
            }}
          />
          {
            <div
              style={{
                flexDirection: "column",
                gap: "1rem",
                display: niloyOpen ? "flex" : "none",
                position: "absolute",
                top: "4rem",
                right: "0rem",
                padding: "2rem 4em",
                background: "white",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "1em",
                border: "2px solid #0d0d0d20",
                fontSize: "1.2em",
                fontWeight: "bold",
                color: "var(--theme)",
              }}
            >
              <Link href="/#">Profile</Link>
              <Link href="/#">Wishlist</Link>
              <Link href="/#">Cart</Link>
              <Link href="/#">Orders</Link>
              <Link href="/#">Logout</Link>
            </div>
          }
        </div>
      </div>
      {/* )} */}
    </nav>
  );
};

export default Header;
