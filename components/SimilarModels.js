import instance from "@/axios";
import React, { useEffect, useState } from "react";
import ProductSlider from "./ProductSlider";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ShadowTitle from "./ShadowTitle";

const SimilarModels = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSimilarProducts = async () => {
    try {
      setLoading(true);
      const response = await instance.post("/similarModel", {
        id_model: productId,
        pageName: "ModelOverview",
      });
      if (response.status === 200) {
        setSimilarProducts(response?.data?.data?.similarModel);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  console.log("SimilarProducts", similarProducts && similarProducts);

  const handleProductClick = (id) => {
    console.log("Product Clicked", id);
  };

  return (
    <div className="ViewContainer">
      <ShadowTitle
        title="Similar Models"
        description="Explore similar models and find the best one for you."
      />
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
        style={{
          marginTop: "2em",
        }}
      >
        {similarProducts?.map((item, index) => (
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
                // router.push({
                //   pathname: `/products/${item?.brandSlug}/${item?.slug}`,
                //   query: { brandname: item?.brandSlug, slug: item?.slug },
                // });
                console.log("Product Clicked", item?.id);
              }}
            >
              <div className="product-image">
                <Image
                  src={item?.image}
                  alt={item?.modelName}
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
                <h3>{item?.modelName}</h3>
                {/* <p>{item?.onRoadPrice * 1.31}</p> */}
                <p>
                  ৳ {""}
                  {item?.onRoadPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarModels;
