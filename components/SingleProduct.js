import instance from "@/axios";
import { Rate, Spin } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SingleProduct = ({ productData, brandname, slug }) => {
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductImages = async () => {
    try {
      setLoading(true);
      const apiUrl = `/modelImage?url=${encodeURIComponent(
        `/${brandname}/${slug}/images`
      )}`;
      console.log("API URL", apiUrl);
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

  useEffect(() => {
    fetchProductImages();
  }, []);

  if (loading) {
    return <Spin />;
  }

  console.log("ProductImages", productImages && productImages);

  return (
    <div
      className="ViewContainer"
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={productData?.image}
        alt={productData?.name}
        width={1200}
        height={600}
        objectFit="cover"
      />

      <div
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <h3>{productData?.name}</h3>
        <Rate disabled allowHalf defaultValue={productData?.avgRating} />
        <div className="flexed-between">
          <p
            style={{
              fontSize: "0.9em",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Engine:{" "}
            <span
              style={{
                color: "var(--tiger)",
              }}
            >
              {productData?.engine}
            </span>
          </p>
          {console.log("ProductData", productData)}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
