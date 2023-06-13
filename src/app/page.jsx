import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import HeroSection from "./components/HeroSection/page";
import PromotionPoster from "./components/PromotionPoster/page";
import ShipmentCTA from "./components/ShipmentCTA";
import Featured from "./components/Featured/page";
import Shop from "./Shop/page";
import Services from "./Services/page";
import Gallery from "./Gallery/page";
import AccessoriesShop from "./components/AccessoriesShop/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromotionPoster />
      <ShipmentCTA />
      <Featured />
      <Gallery />
      <AccessoriesShop />
      {/* <Services /> */}
    </>
  );
}
