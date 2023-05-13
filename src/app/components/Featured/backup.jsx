"use client";
import "./Featured.css";
import { motion } from "framer-motion";
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
  }, []);

  return (
    <>
      {/* {console.log("frontend: ", featuredProducts[0].image)} */}
      <div className="featuredProductContainer">
        <div className="featuredTitleContainer">
          <h1>Featured</h1>
          <h1>Featured</h1>
        </div>
        <div className="featuredProductContainer">
          {featuredProducts &&
            featuredProducts.map((featuredProducts) => (
              <div key={featuredProducts._id}>
                <h2>
                  {console.log("featuredProducts are: ", featuredProducts)}
                  {featuredProducts.description.brand}
                  {featuredProducts.description.model}
                </h2>
                {typeof window !== "undefined" && (
                  <Image
                    src={siteConstants.imageURL + featuredProducts.image}
                    className="featuredProduct"
                    width={2157}
                    height={1554}
                    alt="emni emni"
                    unoptimized="true"
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

          {featuredProducts?.map((featuredProducts) => (
            <table key={featuredProducts._id}>
              <tr>
                <td>Color</td>
                <td>
                  <p>{featuredProducts.description.color}</p>
                </td>
              </tr>

              <tr>
                <td>Engine</td>
                <td>
                  <p>{featuredProducts.description.engine}</p>
                </td>
              </tr>
              <tr>
                <td>Milage</td>
                <td>
                  <p>{featuredProducts.description.mileage}</p>
                </td>
              </tr>
              <tr>
                <td>Year</td>
                <td>
                  <p>{featuredProducts.description.year}</p>
                </td>
              </tr>
              <tr>
                <td>Condition</td>
                <td>
                  <p>{featuredProducts.description.condition}</p>
                </td>
              </tr>
              <tr>
                <td>Views</td>
                <td>
                  <p>{featuredProducts.views}</p>
                </td>
              </tr>
            </table>
          ))}
        </div>
        <div className="priceContainer">
          <h1>Prices</h1>
          <table>
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
          </table>
        </div>
      </div>
    </>
  );
}
