import { Tabs } from "antd";
import Image from "next/image";
import React from "react";

const Colours = ({ tab }) => {
  return (
    <Tabs defaultActiveKey="0">
      {tab &&
        tab?.list?.map((image, index) => (
          <Tabs.TabPane
            tab={
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: image?.hexCode,
                  borderRadius: "50%",
                  border: "1px solid #f0f0f0",
                }}
              />
            }
            key={index}
          >
            <Image
              key={index}
              src={image?.popupImage}
              alt={image?.title}
              width={1200}
              height={600}
              objectFit="cover"
              style={{
                borderRadius: "10px",
              }}
            />
            <h3>{image?.title}</h3>
          </Tabs.TabPane>
        ))}
    </Tabs>
  );
};

export default Colours;
