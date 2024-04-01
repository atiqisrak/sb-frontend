import instance from "@/axios";
import Header from "@/components/Header";
import ShadowTitle from "@/components/ShadowTitle";
import { Rate, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
import ProductSlider from "@/components/ProductSlider";

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { brandname } = router.query;
  const [cat1Data, setCat1Data] = useState([]);
  const [cat2Data, setCat2Data] = useState([]);
  const [cat3Data, setCat3Data] = useState([]);
  const [cat4Data, setCat4Data] = useState([]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      // concurrently fetch data for tvs, hero, honda, bajaj
      const tvsData = instance.get(`/brandPage?url=%2Ftvs-bikes`);
      const heroData = instance.get(`/brandPage?url=%2Fhero-bikes`);
      const hondaData = instance.get(`/brandPage?url=%2Fhonda-bikes`);
      const bajajData = instance.get(`/brandPage?url=%2Fbajaj-bikes`);
      const [tvsResponse, heroResponse, hondaResponse, bajajResponse] =
        await Promise.all([tvsData, heroData, hondaData, bajajData]);

      if (tvsResponse.status === 200) {
        setCat1Data(tvsResponse?.data?.data);
      }
      if (heroResponse.status === 200) {
        setCat2Data(heroResponse?.data?.data);
      }
      if (hondaResponse.status === 200) {
        setCat3Data(hondaResponse?.data?.data);
      }
      if (bajajResponse.status === 200) {
        // setCat4Data(bajajResponse?.data?.data?.primaryData);
        setCat4Data(bajajResponse?.data?.data);
      } else {
        console.log("Error fetching data");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  console.log("CategoryData", cat1Data && cat1Data);

  return (
    <div>
      <Header />

      <div className="ViewContainer">
        <ProductSlider title="TVS Bikes" productData={cat1Data} />
        <ProductSlider title="Hero Bikes" productData={cat2Data} />
        <ProductSlider title="Honda Bikes" productData={cat3Data} />
        <ProductSlider title="Bajaj Bikes" productData={cat4Data} />
      </div>
    </div>
  );
};

export default Products;
