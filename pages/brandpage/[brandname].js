import instance from "@/axios";
import Header from "@/components/Header";
import ShadowTitle from "@/components/ShadowTitle";
import { Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BrandPage() {
  const [brandData, setBrandData] = useState([]);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { brandname } = router.query;

  const fetchBrandData = async () => {
    try {
      setLoading(true);
      const response = await instance.get(
        `/brandPage?url=%2F${brandname}-bikes`
      );
      if (response.status === 200) {
        setBrandData(response?.data?.data?.primaryData);
        setLoading(false);
      } else {
        console.log("Error fetching data");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  console.log("BrandData 3", brandData ? brandData : "No Brand data Found");

  return (
    <div>
      <Header />
      <div className="ViewContainer">
        {/* <h1>{brandname} bikes</h1> */}
        <ShadowTitle
          // title={`${brandname} Bikes`}
          // capitalize the first letter of the brand name
          title={`${
            brandname.charAt(0).toUpperCase() + brandname.slice(1)
          } Bikes`}
          description={`Explore ${brandname} bikes and find the best one for you.`}
        />
        <div
          className="brands"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            padding: "20px",
          }}
        >
          {brandData &&
            brandData?.items?.map((brand, index) => (
              <div
                key={index}
                className="brand"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "0 0 10px 0",
                  border: "1px solid #f0f0f0",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  router.push(`/modelpage/${brand?.modelUrl}`);
                }}
              >
                <Image
                  src={brand?.image}
                  alt={brand?.imageTitle}
                  width={300}
                  height={250}
                  objectFit="cover"
                  style={{ borderRadius: "10px" }}
                />
                <div>
                  <h4>{brand?.name}</h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { brandname } = params;

  try {
    const response = await instance.get(`/brandPage?url=%2F${brandname}-bikes`);
    const brandData = response?.data?.data?.primaryData || null;
    return {
      props: {
        brandData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        brandData: null,
      },
    };
  }
}
