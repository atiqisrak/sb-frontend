import instance from "@/axios";
import { Rate, Spin, Tabs } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShadowTitle from "./ShadowTitle";
import YouTube from "react-youtube";

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
        marginBottom: "5em",
      }}
    >
      <ShadowTitle
        title={productData?.name}
        // description=`Checkout the ${productData?.name} from ${brandname} brand`
        description={`Checkout the ${productData?.name} from ${brandname} brand`}
      />

      <Tabs defaultActiveKey="0">
        <Tabs.TabPane tab="Overview" key="0">
          <Image
            // src={productData?.image}
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
        </Tabs.TabPane>
        {productImages &&
          productImages?.map((tab, index) => (
            <Tabs.TabPane tab={tab?.tabTitle} key={index + 1}>
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

        {/* <Tabs.TabPane tab="Images" key="2">
          {productImages &&
            productImages[0]?.list?.map((image, index) => (
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
            ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Colors" key="3">
          {
            <div
              style={{
                display: "flex",
                gap: "1em",
                padding: "10px 30px",
                backgroundColor: "white",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Tabs defaultActiveKey="0">
                {productImages &&
                  productImages[1]?.list?.map((image, index) => (
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
            </div>
          }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Videos" key="4">
          {productImages &&
            productImages[2]?.list?.map((video, index) => (
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
            ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Road Test" key="5">
          <h1>{productData?.name} Road Test</h1>
        </Tabs.TabPane> */}
      </Tabs>
    </div>
  );
};

export default SingleProduct;
