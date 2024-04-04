import ShadowTitle from "../ShadowTitle";
import Image from "next/image";
import React from "react";

export default function Competitors({ compareWith, productData }) {
  return (
    <div className="competitos-list">
      <ShadowTitle title={`${productData?.name} Competitors`} />
      {/* {console.log("CompareWith", compareWith?.list)} */}
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
  );
}
