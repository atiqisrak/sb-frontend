import Image from "next/image";
import "./promotional.css";

export default function PromotionPoster() {
  return (
    <>
      <Image
        src="/Images/promo.png"
        alt="Promotional Campaign"
        width={1440}
        height={810}
        className="promoCampDesk"
      />
      <Image
        src="/Images/mobipromo.png"
        alt="Promotional Campaign"
        width={1440}
        height={810}
        className="promoCampMobi"
      />
    </>
  );
}
