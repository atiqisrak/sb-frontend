import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
import ShadowTitle from "./ShadowTitle";
import { Button, Rate, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductSlider({ title, productData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <ShadowTitle
        title={title}
        description="Explore the best bikes from this brand"
      />

      {productData?.primaryData?.items && (
        <div
          style={{
            marginTop: "2em",
            border: "2px solid #f0f0f0",
            borderRadius: "10px",
            padding: "2em",
            // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                backgroundColor: "#f0f0f0",
                color: "#000",
                borderRadius: "5px",
                marginBottom: "10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "1px solid var(--tiger)",
                color: "var(--tiger)",
                borderRadius: "5px",
                fontSize: "1rem",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                // console.log("Niloy: ", `/brandpage/${productData?.brandSlug}`);
                router.push(`/brandpage/${productData?.brandSlug}`);
              }}
            >
              Show All
            </Button>
          </div>
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
            {/* {productData?.primaryData?.items?.map((item, index) => ( */}
            {productData?.primaryData?.items?.slice(0, 6).map((item, index) => (
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
                    router.push({
                      pathname: `/products/${item?.brandSlug}/${item?.slug}`,
                      query: { brandname: item?.brandSlug, slug: item?.slug },
                    });
                  }}
                >
                  <div className="product-image">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      width={600}
                      height={400}
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
}
