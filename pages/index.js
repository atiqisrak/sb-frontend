import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import HeroSection from "@/components/homepage/HeroSection";
import PromotionPoster from "@/components/homepage/PromotionPoster";
import ShipmentCTA from "@/components/homepage/ShipmentCTA";
import Brands from "@/components/homepage/Brands";
export default function Home() {
  return (
    <>
      <Head>
        <title>Sardar Bikes</title>
        <meta name="description" content="Generated by niloy cms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <HeroSection />
        <PromotionPoster />
        <ShipmentCTA />
        <Brands />
      </main>
    </>
  );
}