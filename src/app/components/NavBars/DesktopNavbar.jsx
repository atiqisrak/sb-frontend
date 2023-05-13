"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, redirect } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { IconContext } from "react-icons";
import { router } from "next/navigation";

export default function DesktopNavbar() {
  const router = useRouter();
  return (
    <>
      <motion.div className="grided desktopNavContainer">
        <motion.div className="desktopLogoContainer flexed">
          <Link href="/">
            <Image
              src="/Images/sardarlogo.svg"
              alt="Sardar Bikes Official Logo"
              width={192}
              height={42}
            />
          </Link>
        </motion.div>
        <motion.div className="desktopMenuContainer flexed">
          <motion.ul className="desktopMenuList flexed" motion={{}}>
            <motion.li
              onClick={() => router.push("/ProductForm")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Add Product
            </motion.li>
            <motion.li
              onClick={() => router.push("/ShopForm")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Add Shop
            </motion.li>
            <motion.li
              onClick={() => router.push("/Whatsnew")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              What's New
            </motion.li>
            <motion.li
              onClick={() => router.push("/Bikes")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Bikes
            </motion.li>
            <motion.li
              onClick={() => router.push("/Shops")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Shops
            </motion.li>

            <motion.li
              onClick={() => router.push("/Accessories")}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Accessories
            </motion.li>
          </motion.ul>

          <motion.ul className="desktopSocialIconList flexed">
            <IconContext.Provider value={{ size: "24px", color: "#fff" }}>
              <motion.li>
                <Link href="https://www.facebook.com">
                  <FiFacebook />
                </Link>
              </motion.li>
              <motion.li>
                <Link href="https://www.youtube.com">
                  <FaYoutube />{" "}
                </Link>
              </motion.li>

              <motion.li>
                <Link href="https://www.tiktok.com">
                  <FaTiktok />{" "}
                </Link>
              </motion.li>
            </IconContext.Provider>
          </motion.ul>
        </motion.div>
      </motion.div>
    </>
  );
}
