import React from "react";

import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const ShadowTitle = ({ title, description }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      <div
        className="titles changa"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5rem",
        }}
      >
        <Title
          className="changa"
          autoSize={true}
          level={1}
          style={{
            color: "#ff733b",
            fontSize: "3rem",
            fontWeight: 400,
            lineHeight: "1.2rem",
            zIndex: 1,
            // font-family: "Changa One", cursive;
          }}
        >
          {title}
        </Title>
        <Title
          className="changa"
          autoSize={true}
          level={1}
          style={{
            color: "#7b7b7b20",
            fontSize: "5rem",
            fontWeight: 400,
            lineHeight: "1.2rem",
            position: "absolute",
            marginTop: "-3rem",
          }}
        >
          {title}
        </Title>
        {/* <Paragraph
          style={{
            paddingTop: "1rem",
            fontFamily: "Poppins",
            color: "#7b7b7b",
            fontSize: "1.2rem",
            fontWeight: 400,
            lineHeight: "1.2rem",
            letterSpacing: "0.2rem",
          }}
        >
          dangerouslySetInnerHTML={{ __html: description }}
        </Paragraph> */}
        <p
          style={{
            paddingTop: "1rem",
            fontFamily: "Poppins",
            color: "#7b7b7b",
            fontSize: "1.2rem",
            fontWeight: 400,
            lineHeight: "1.2rem",
            textAlign: "center",
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default ShadowTitle;
