import instance from "@/axios";
import { Col, Rate, Row, Spin, Table, Tabs } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShadowTitle from "./ShadowTitle";
import YouTube from "react-youtube";
import { FireOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DetailsTabs from "./Product/DetailsTabs";
import ProductReview from "./Product/ProductReview";
import Competitors from "./Product/Competitors";
import SpecsComparison from "./Product/SpecsComparison";

const SingleProduct = ({
  productData,
  brandname,
  slug,
  productReviews,
  compareWith,
  specsComparison,
}) => {
  const [productImages, setProductImages] = useState([]);
  const [productSpecs, setProductSpecs] = useState([]);
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [aboutProduct, setAboutProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProductImages = async () => {
    try {
      setLoading(true);
      const apiUrl = `/modelImage?url=${encodeURIComponent(
        `/${brandname}/${slug}/images`
      )}`;
      const response = await instance.get(apiUrl);
      if (response.status === 200) {
        setProductImages(response?.data?.data?.images);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductSpecs = async () => {
    try {
      setLoading(true);
      const apiUrl = `/modelSpec?url=${encodeURIComponent(
        `/${brandname}/${slug}/specifications`
      )}`;
      const response = await instance.get(apiUrl);
      if (response.status === 200) {
        setProductSpecs(response?.data?.data?.specs);
        setAboutProduct(response?.data?.data?.modelAboutUs);
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
    fetchProductImages();
    fetchProductSpecs();
  }, []);

  if (loading) {
    return <Spin />;
  }

  // console.log("ProductImages", productImages && productImages);
  // console.log("ProductSpecs", productSpecs && productSpecs);
  // console.log("About", productSpecs && aboutProduct);
  // console.log("ProductData", productData && productData);
  // console.log("productReviews", productReviews && productReviews);

  return (
    <div
      className="ViewContainer"
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5em",
      }}
    >
      <ShadowTitle
        title={productData?.name}
        description={`Checkout the ${productData?.name} from ${brandname} brand`}
      />
      <DetailsTabs
        productImages={productImages}
        productData={productData}
        productSpecs={productSpecs}
        aboutProduct={aboutProduct}
      />

      {/* Product Review */}
      <ProductReview productReviews={productReviews} />

      {/* Competitors */}
      <Competitors compareWith={compareWith} productData={productData} />

      {/* Specifications Comparison */}
      <SpecsComparison specsComparison={specsComparison} />
    </div>
  );
};

export default SingleProduct;

export async function getServerSideProps({ params }) {
  const { brandname, slug } = params;
  // specs
  const apiUrl = `/modelSpec?url=${encodeURIComponent(
    `/${brandname}/${slug}/specifications`
  )}`;
  const response = await instance.get(apiUrl);
  const productData = response?.data?.data;
  return {
    props: {
      productData,
      brandname,
      slug,
    },
  };
}
