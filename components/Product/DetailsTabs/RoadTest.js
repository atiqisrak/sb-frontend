import Image from "next/image";
import React from "react";

const RoadTest = ({ image, index }) => {
  return (
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
  );
};

export default RoadTest;
