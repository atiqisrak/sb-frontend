import Image from "next/image";
import React from "react";
import ShadowTitle from "../ShadowTitle";

export default function ProductReview({ productReviews }) {
  return (
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
  );
}
