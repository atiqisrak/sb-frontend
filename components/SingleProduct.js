import instance from "@/axios";
import { Rate, Spin, Tabs } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShadowTitle from "./ShadowTitle";
import YouTube from "react-youtube";
import { FireOutlined } from "@ant-design/icons";

const SingleProduct = ({ productData, brandname, slug, darkmode }) => {
  const [productImages, setProductImages] = useState([]);
  const [productSpecs, setProductSpecs] = useState([]);
  const [showFullSpecs, setShowFullSpecs] = useState(false);
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

  const fetchProductSpecs = async () => {
    try {
      setLoading(true);
      const apiUrl = `/modelSpec?url=${encodeURIComponent(
        `/${brandname}/${slug}/specifications`
      )}`;
      console.log("API URL", apiUrl);
      const response = await instance.get(apiUrl);
      if (response.status === 200) {
        setProductSpecs(response?.data?.data?.specs);
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
  console.log("ProductSpecs", productSpecs && productSpecs);
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
              {/* <center>
                <h3>Key Specifications</h3>
              </center> */}
              <ShadowTitle title="Key Specifications" />
              {productSpecs &&
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
                ))}
            </div>
          </div>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                      padding: "10px 30px",
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <Image
                      key={index}
                      src={image?.popupImage}
                      alt={image?.title}
                      width={1200}
                      height={600}
                      objectFit="cover"
                      style={{
                        borderRadius: "10px",
                      }}
                    />
                    <h3>{image?.title}</h3>
                  </div>
                ))
              ) : tab && tab?.tabTitle === "Colours" ? (
                <Tabs defaultActiveKey="0">
                  {tab &&
                    tab?.list?.map((image, index) => (
                      <Tabs.TabPane
                        tab={
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: image?.hexCode,
                              borderRadius: "50%",
                              border: "1px solid #f0f0f0",
                            }}
                          />
                        }
                        key={index}
                      >
                        <Image
                          key={index}
                          src={image?.popupImage}
                          alt={image?.title}
                          width={1200}
                          height={600}
                          objectFit="cover"
                          style={{
                            borderRadius: "10px",
                          }}
                        />
                        <h3>{image?.title}</h3>
                      </Tabs.TabPane>
                    ))}
                </Tabs>
              ) : tab && tab?.tabTitle === "Videos" ? (
                tab &&
                tab?.list?.map((video, index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                      padding: "10px 30px",
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <YouTube
                      videoId={video?.videoId}
                      opts={{
                        width: "100%",
                        height: "400px",
                        playerVars: {
                          autoplay: 0,
                        },
                      }}
                    />
                    <h3>{video?.title}</h3>
                  </div>
                ))
              ) : tab && tab?.tabTitle === "Road Test" ? (
                // Road test images
                tab &&
                tab?.list?.map((image, index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                      padding: "10px 30px",
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <Image
                      key={index}
                      src={image?.tabImage}
                      alt={image?.title}
                      width={1200}
                      height={600}
                      objectFit="cover"
                      style={{
                        borderRadius: "10px",
                      }}
                    />
                    <h3>{image?.title}</h3>
                  </div>
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

export default SingleProduct;
