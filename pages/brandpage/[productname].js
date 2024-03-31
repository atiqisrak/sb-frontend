import instance from "@/axios";
import Header from "@/components/Header";
import ShadowTitle from "@/components/ShadowTitle";
import { Rate, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [brandData, setBrandData] = useState([]);
  const [productData, setProductData] = useState([]);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { brandname, slug } = router.query;

  const fetchProductData = async () => {
    try {
      setLoading(true);
      if (!brandname || !slug) {
        throw new Error("Brandname or slug is undefined");
      }
      console.log("brandname", brandname);
      console.log("slug", slug);
    } catch (error) {
      console.log("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  // console.log(
  //   "fetchProductData NN: ",
  //   productData ? productData : "No Brand data Found"
  // );

  return (
    <div>
      <Header />
      <div className="ViewContainer">
        <ShadowTitle title="Product Page" description="Product Page" />
      </div>
    </div>
  );
};

export default ProductPage;
