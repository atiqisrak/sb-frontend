import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import ShadowTitle from "@/components/ShadowTitle";
import { Spin, message } from "antd";
import instance from "@/axios";
import SingleProduct from "@/components/SingleProduct";
import SimilarModels from "@/components/SimilarModels";

const ProductPage = () => {
  const router = useRouter();
  const { brandname, slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        if (!brandname || !slug) {
          return message.error("Invalid URL");
        } else {
          const apiUrl = `/modelOverview?url=${encodeURIComponent(
            `/${brandname}/${slug}`
          )}`;
          const response = await instance.get(apiUrl);
          if (response.status === 200) {
            setProductData(response?.data?.data);
          } else {
            console.log("Error fetching data");
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [brandname, slug]);

  if (loading) {
    return <Spin />;
  }

  const handleShowMore = () => {
    setShowAllProducts(!showAllProducts);
  };

  console.log("ProductData", productData && productData);

  return (
    <div>
      <div>
        {productData && (
          <div>
            <SingleProduct
              productData={productData?.overview}
              brandname={brandname}
              slug={slug}
              productReviews={productData?.pronsAndCons}
              compareWith={productData?.compareWith}
              specsComparison={productData?.specsComparison}
            />
          </div>
        )}
      </div>
      <div>
        <SimilarModels productId={productData?.overview?.id} />
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ params }) {
  const { brandname, slug } = params;

  try {
    const apiUrl = `/modelOverview?url=${encodeURIComponent(
      `/${brandname}/${slug}`
    )}`;
    const response = await instance.get(apiUrl);
    if (response.status === 200) {
      return {
        props: {
          productData: response?.data?.data,
        },
      };
    } else {
      console.log("Error fetching data");
    }
  } catch (error) {
    console.log("Error fetching data:", error.message);
  }
  return {
    props: {
      productData: null,
    },
  };
}
