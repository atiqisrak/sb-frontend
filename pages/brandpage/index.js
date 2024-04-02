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
      <Brands />
    </>
  );
}
