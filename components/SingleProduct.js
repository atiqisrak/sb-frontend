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

      {/* Product Review */}
      <div
        className="product-review"
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <ShadowTitle title="Product Reviews" />
        <div
          className="pros-and-cons"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1em",
          }}
        >
          <div
            style={{
              color: "green",
              padding: "2em 4em",
              border: "1px solid #f0f0f0",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Pros</h3>
            <ul
              style={{
                fontSize: "1.2em",
                fontWeight: "500",
              }}
            >
              {productReviews?.items?.pros?.items?.map((pro, index) => (
                <li key={index}>{pro?.pros}</li>
              ))}
            </ul>
          </div>
          <div
            style={{
              color: "red",
              padding: "2em 4em",
              border: "1px solid #f0f0f0",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Cons</h3>
            <ul
              style={{
                fontSize: "1.2em",
                fontWeight: "500",
              }}
            >
              {productReviews?.items?.cons?.items?.map((con, index) => (
                <li key={index}>{con?.cons}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <ShadowTitle title="Standout Features" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1em",
              padding: "10px",
            }}
          >
            {productReviews?.items?.standOutFeatures?.items?.map(
              (feature, index) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    backgroundColor: "white",
                    border: "1px solid #f0f0f0",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    key={index}
                    src={feature?.imageUrl}
                    alt={feature?.standOutFeaturesWithoutTag}
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
                  <h3>{feature?.standOutFeaturesWithoutTag}</h3>
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <ShadowTitle title="SardarBikes Verdict" />
          <p
            style={{
              fontSize: "1.2em",
              fontWeight: "500",
              textAlign: "justify",
            }}
          >
            {productReviews?.items?.verdict}
          </p>
        </div>
      </div>

      {/* Competitor & Specifications comparison */}
      <div className="competitos-list">
        <ShadowTitle title={`${productData?.name} Competitors`} />
        {console.log("CompareWith", compareWith?.list)}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1em",
            padding: "10px 30px",
            backgroundColor: "white",
            border: "1px solid #f0f0f0",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {compareWith?.list?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                backgroundColor: "white",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={item?.image}
                alt={item?.modelName}
                width={300}
                height={200}
                objectFit="cover"
                style={{
                  borderRadius: "10px",
                }}
              />
              <h3>{item?.modelName}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Comparison */}
      <div className="product-specs-comparison">
        <ShadowTitle title={specsComparison?.heading} />
        {/* Table 7 rows */}
        {/* <Col span={24}>
          specsComparison?.specs?.map((spec, index) => (

            <Row>{spec?.text}</Row>
          ))
        </Col> */}
        <Table
          columns={[
            {
              title: "Specifications",
              dataIndex: "text",
              key: "text",
              width: "50%",
            },
            {
              title: "This Model",
              dataIndex: "thisModel",
              key: "thisModel",
              width: "25%",
            },
            {
              title: "Competitor",
              dataIndex: "competitor",
              key: "competitor",
              width: "25%",
            },
          ]}
          dataSource={specsComparison?.specs}
          pagination={false}
          bordered
          size="small"
          scroll={{ y: 240 }}
        />
      </div>
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
