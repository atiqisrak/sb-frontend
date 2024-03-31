import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Typography } from "antd";
const { Title, Paragraph } = Typography;
import dataset from "../../data/allmodels.json";
import { useRouter } from "next/router";
import ShadowTitle from "@/components/ShadowTitle";
import Header from "@/components/Header";
import Brands from "@/components/homepage/Brands";

export default function BrandPage() {
  const [brandData, setBrandData] = useState([]);
  const [showAllBrands, setShowAllBrands] = useState(true);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const router = useRouter();

  useEffect(() => {
    setBrandData(dataset && dataset?.mmv);
  }, []);

  const handleShowMore = () => {
    setShowAllBrands(!showAllBrands);
  };

  return (
    <>
      <Header />
      {/* <div className="ViewContainer">
        <ShadowTitle
          title="Bike Brands"
          description="Brands that breath your excitement"
        />

        <div
          className="brands"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "20px",
            padding: "20px",
          }}
        >
          {brandData &&
            brandData
              ?.slice(0, showAllBrands ? brandData.length : 15)
              ?.map((brand, index) => (
                <div
                  key={index}
                  className="brand"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "20px",
                    border: "1px solid #f0f0f0",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    router.push(`/brandpage/${brand?.oemSlug}`);
                  }}
                >
                  <Image
                    src={
                      MEDIA_URL + "/brandLogo_168x84/" + brand?.oemSlug + ".jpg"
                    }
                    alt={brand?.oem}
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                  <Title level={5}>{brand?.oem}</Title>
                </div>
              ))}
        </div>
        <center>
          {brandData.length > 15 && (
            <Button
              onClick={handleShowMore}
              style={{
                background: "var(--tiger)",
                color: "var(--white)",
                fontSize: "16px",
                fontWeight: "bold",
                width: "200px",
                height: "50px",
                border: "2px solid var(--tiger)",
                borderRadius: "5px",
                margin: "20px 0 40px 0",
              }}
            >
              Show {showAllBrands ? "Less" : "More"}
            </Button>
          )}
        </center>
      </div> */}
      <Brands />
    </>
  );
}
