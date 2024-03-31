import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="heroSectionContainer">
      <div className="heroContainer">
        <div className="content">
          <h1>
            Grab <br />
            Your <br />
            Ride
          </h1>
          <div className="review">
            <p>"Extraordinary"</p>
            <Image
              src="/Images/Group33.svg"
              alt="Review stars"
              width={113}
              height={43}
            />
          </div>
        </div>
        <motion.div
          className="bikeImage"
          initial={{
            x: -30,
          }}
          animate={{
            transform: "translateX(10%)",
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        >
          <Image
            src="/Images/herosectionbike2.png"
            alt="Featured Bike"
            width={645}
            height={540}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
