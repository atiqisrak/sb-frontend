import instance from "@/axios";
import ShadowTitle from "@/components/ShadowTitle";
import { Spin, Select } from "antd";
import { all } from "axios";
import React, { useEffect, useState } from "react";

export default function compare() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [modelSelected, setModelSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/allModelsWithStatus");
      if (response.status === 200) {
        setAllProducts(response?.data?.mmv);
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
    fetchAllProducts();
  }, []);

  if (loading) {
    return <Spin />;
  }

  console.log("allProducts", allProducts);

  const handleModelSelect = async (value) => {
    setModelSelected(true);
    try {
      setLoading(true);
      const Url = `/getVariantNameByModelLink?carModelName=${value}`;
      const response = await instance.get(Url);
      if (response.status === 200) {
        setSelectedProducts(...selectedProducts, response?.data?.data);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("selectedProducts", selectedProducts);

  return (
    <div className="ViewContainer">
      <ShadowTitle title="Compare Products" />

      {/* Comparison */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <div>
          <center>
            <h1>Coming Soon ...</h1>
          </center>
          {/* <h2>Product 1</h2> */}
          {allProducts?.map((product) => console.log(product?.CM))}
          {/* <Select
            style={{ width: "100%" }}
            placeholder="Select Products to Compare"
            onChange={(value) => handleModelSelect(value)}
            options={allProducts?.map((product, index) => ({
              label: product?.CM ? product?.CM?.map((cm) => cm?.MN) : "",
              value: product?.CM ? product?.CM?.map((cm) => cm?.MS) : "",
            }))}
          /> */}
          {/* {
            <Select
              style={{ width: "100%" }}
              placeholder="Select Products to Compare"
              onChange={(value) => handleModelSelect(value)}
              options={allProducts?.map((product, index) => ({
                label: product?.CM ? product?.CM?.map((cm) => cm?.MN) : "",
                value: product?.CM ? product?.CM?.map((cm) => cm?.MS) : "",
              }))}
            />
          } */}
          {/* {modelSelected && (
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Variant"
              options={selectedProducts?.map((product) => ({
                label: displayName,
                value: variantSlug,
              }))}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
