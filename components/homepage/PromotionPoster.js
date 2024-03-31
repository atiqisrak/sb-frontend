import Image from "next/image";
import React from "react";

const PromotionPoster = () => {
  return (
    <div>
      {/* <Image
        src="/Images/promo.png"
        alt="Promotional Campaign"
        width={1440}
        height={810}
        className="promoCampDesk"
      /> */}
      <img
        src="/Images/promo.png"
        alt="Promotional Campaign"
        className="promoCampDesk"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default PromotionPoster;
