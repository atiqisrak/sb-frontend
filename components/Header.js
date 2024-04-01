import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Avata, Avatar, Input, Space } from "antd";
import Link from "next/link";
import {
  BarsOutlined,
  DownOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [brandNames, setBrandNames] = useState([]);
  const [brandSlugs, setBrandSlugs] = useState();
  const [brandsOpen, setBrandsOpen] = useState(false);
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
              <Menu.Item key={index}>
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
        <Input.Search />
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
          />
        </div>
      </div>
      {/* )} */}
    </nav>
  );
};

export default Header;
