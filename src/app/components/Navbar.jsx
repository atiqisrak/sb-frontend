"use client";
import DesktopNavbar from "./NavBars/DesktopNavbar";
import MobileNavbar from "./NavBars/MobileNavbar";
import { usePathname, useRouter, redirect } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  //   Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="desktopNavbar flexed">
        <DesktopNavbar />
      </div>
      <div className="mobileNavbar flexed">
        <MobileNavbar />
      </div>
    </>
  );
}
