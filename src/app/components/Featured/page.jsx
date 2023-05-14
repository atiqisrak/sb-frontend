"use client";
import "./Featured.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { siteConstants } from "../../global/constants/datasource";

export default function Featured() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/featured");
        const data = await response.json();
        const fData = data[0];
        setFeaturedProducts([fData]);
        console.log("Products loaded:", fData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setFeaturedProducts]);

  return (
    <>
      <div className="featuredProductContainers">
        <div className="featuredTitleContainer">
          <h1>Featured</h1>
        </div>
        <div className="featuredProductContainer">
          {featuredProducts &&
            featuredProducts.map((featuredProducts) => (
              <div key={featuredProducts._id}>
                <div className="productTitle flexed centered">
                  {/* {console.log("featuredProducts are: ", featuredProducts)} */}
                  <h2 className="featuredBrand">
                    {featuredProducts.description.brand}
                  </h2>
                  <h3 className="featuredModel">
                    {featuredProducts.description.model}
                  </h3>
                </div>
                {typeof window !== "undefined" && (
                  <Image
                    src={"/images/" + featuredProducts.image}
                    className="featuredProduct"
                    width={2157}
                    height={1554}
                    alt="Product Picture"
                    // unoptimized="true"
                    suppressHydrationWarning={true}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="desPriceContainer">
        <div className="descriptionCOntainer">
          <h1>DESCRIPTION</h1>
          {featuredProducts?.map((product) => (
            <table key={product._id}>
              <tbody>
                <tr>
                  <td>Color</td>
                  <td>
                    <p>{product.description.color}</p>
                  </td>
                </tr>
                <tr>
                  <td>Engine</td>
                  <td>
                    <p>{product.description.engine}</p>
                  </td>
                </tr>
                <tr>
                  <td>Mileage</td>
                  <td>
                    <p>{product.description.mileage}</p>
                  </td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>
                    <p>{product.description.year.slice(0, 4)}</p>
                  </td>
                </tr>
                <tr>
                  <td>Condition</td>
                  <td>
                    <p>{product.description.condition}</p>
                  </td>
                </tr>
                <tr>
                  <td>Views</td>
                  <td>
                    <p>{product.views}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        <div className="priceContainer">
          <h1>Prices</h1>
          <table>
            <tbody>
              <tr>
                <td>Shop 1</td>
                <td>
                  <p>15544 KM</p>
                </td>
                <td>2,45,000/-</td>
              </tr>
              <tr>
                <td>Shop 1</td>
                <td>
                  <p>15544 KM</p>
                </td>
                <td>2,45,000/-</td>
              </tr>
              <tr>
                <td>Shop 1</td>
                <td>
                  <p>15544 KM</p>
                </td>
                <td>2,45,000/-</td>
              </tr>
              <tr>
                <td>Shop 1</td>
                <td>
                  <p>15544 KM</p>
                </td>
                <td>2,45,000/-</td>
              </tr>
              <tr>
                <td>Shop 1</td>
                <td>
                  <p>15544 KM</p>
                </td>
                <td>2,45,000/-</td>
              </tr>
              <tr>
                <td>Shop 1</td>
                <td>
                  <p>15544 KM</p>
                </td>
                <td>2,45,000/-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
