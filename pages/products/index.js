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

const Products = () => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
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
    <div className="ViewContainer">
      <Header />
      <ShadowTitle
        title={cat1Data?.priceListTitle}
        description="Explore the best bikes from this brand"
      />
      {/* Swiper JS scroll horizontal with view all button on right */}
      {cat1Data?.primaryData?.items && (
        <div style={{ marginTop: "2em" }}>
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            onNavigationNext={(swiper) => {
              // slide to next
              swiper.slideNext();
            }}
          >
            {cat1Data?.primaryData?.items?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="product"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 0 20px 0",
                    border: "1px solid #f0f0f0",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    // router.push(`/products/${brandname}/${item?.slug}`);
                    console.log(
                      "Product Clicked: ",
                      `/products/${brandname}/${item?.slug}`
                    );
                  }}
                >
                  <div className="product-image">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      width={300}
                      height={200}
                      style={{
                        objectFit: "contain",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="product-details">
                    <h3>{item?.name}</h3>
                    <p>{item?.price}</p>
                    <Rate disabled defaultValue={item?.rating} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Products;
