import instance from "@/axios";
import React, { useEffect, useState } from "react";

export default function bikebrands({ brandname }) {
  const [brandData, setBrandData] = useState([]);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const fetchBrandData = async () => {
    try {
      const response = await instance.get(
        `/brandPage?url=%2Fbrand${brandname}-bikes`
      );
      if (response.status === 200) {
        setBrandData(response?.data);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  console.log("BrandData", brandData && brandData);

  return (
    <div>
      <h1>Niloy</h1>
      <h2>{brandname}</h2>
    </div>
  );
}
