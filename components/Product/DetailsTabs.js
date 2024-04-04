import { Tabs } from "antd";
import Image from "next/image";
import React from "react";
import { FireOutlined } from "@ant-design/icons";
import ImageGallery from "./DetailsTabs/ImageGallery";
import Colours from "./DetailsTabs/Colours";
import VideoGallery from "./DetailsTabs/VideoGallery";
import RoadTest from "./DetailsTabs/RoadTest";
import ShadowTitle from "../ShadowTitle";

const DetailsTabs = ({
  productImages,
  productData,
  productSpecs,
  aboutProduct,
}) => {
  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        animated={true}
        centered={true}
        size="large"
        tabBarGutter={10}
        type="card"
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
          fontSize: "1.2em",
          fontWeight: "bold",
        }}
      >
        <Tabs.TabPane tab="Overview" key="0">
          <Image
            src={
              productImages[0]?.list[0]?.popupImage
                ? productImages[0]?.list[0]?.popupImage
                : productData?.image
            }
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
            <div
              className="product-specs"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <ShadowTitle title="Key Specifications" />
              {productSpecs?.keySpecs ? (
                productSpecs?.keySpecs[0]?.items?.map((spec, index) => (
                  <center>
                    <div
                      key={index}
                      style={{
                        width: "60%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0",
                        borderBottom: "1px solid #f0f0f0",
                        fontSize: "0.8em",
                      }}
                    >
                      <p dangerouslySetInnerHTML={{ __html: spec?.text }} />
                      <p dangerouslySetInnerHTML={{ __html: spec?.value }} />
                    </div>
                  </center>
                ))
              ) : (
                <h3>No Key Specifications available</h3>
              )}
            </div>
          </div>

          {/* About Product */}
          <div
            className="about-product"
            style={{
              width: "100%",
              padding: "10px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <ShadowTitle title={`About ${productData?.name}`} />
            <p
              style={{
                fontSize: "0.9em",
                fontWeight: "normal",
                textAlign: "justify",
                color: "var(--zebra)",
              }}
              dangerouslySetInnerHTML={{ __html: aboutProduct?.description }}
            />
          </div>

          {/* Other Tabs */}
        </Tabs.TabPane>
        {productImages &&
          productImages?.map((tab, index) => (
            <Tabs.TabPane
              tab={tab?.tabTitle}
              key={index + 1}
              icon={
                <FireOutlined
                  style={{
                    color: "var(--tiger)",
                  }}
                />
              }
            >
              {tab && tab?.tabTitle === "Images" ? (
                tab &&
                tab?.list?.map((image, index) => (
                  <ImageGallery key={index} image={image} />
                ))
              ) : tab && tab?.tabTitle === "Colours" ? (
                <Colours tab={tab} />
              ) : tab && tab?.tabTitle === "Videos" ? (
                tab &&
                tab?.list?.map((video, index) => (
                  <VideoGallery key={index} video={video} />
                ))
              ) : tab && tab?.tabTitle === "Road Test" ? (
                tab &&
                tab?.list?.map((image, index) => (
                  <RoadTest key={index} image={image} />
                ))
              ) : (
                <h1>Coming Soon ...</h1>
              )}
            </Tabs.TabPane>
          ))}
      </Tabs>
    </div>
  );
};

export default DetailsTabs;
