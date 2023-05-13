"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, redirect } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import Ham from "./Ham";
import "./ham.css";

export default function MobileNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div className="grided mobileNavContainer">
        <motion.div className="mobileLogoContainer flexed">
          <Link href="/">
            <Image
              src="/Images/mobilelogo.svg"
              alt="Sardar Bikes Official Logo"
              width={73}
              height={27.3}
            />
          </Link>
        </motion.div>
        <div className="hamburger flexed">
          <Ham isOpen={isOpen} handleClick={handleToggleMenu} />
        </div>
        {isOpen && (
          <motion.div className="mobileMenuContainer flexed">
            <motion.ul className="mobileMenuList flexed" motion={{}}>
              <motion.li
                onClick={() => router.push("/Whatsnew")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                What's New
              </motion.li>
              <motion.li
                onClick={() => router.push("/Bikes")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Bikes
              </motion.li>
              <motion.li
                onClick={() => router.push("/Shops")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Shops
              </motion.li>

              <motion.li
                onClick={() => router.push("/Accessories")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                Accessories
              </motion.li>
            </motion.ul>

            <motion.ul className="mobileSocialIconList flexed">
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
        )}
      </motion.div>
    </>
  );
}
