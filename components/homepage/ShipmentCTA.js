import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function ShipmentCTA() {
  return (
    <div className="ctas flexed">
      <div className="desky">
        <div className="dCta grided">
          <div className="ctacontents grided">
            <Image
              src="/Images/deliverytruck.svg"
              alt="Delivery truck icon"
              width={60}
              height={60}
              className="ddeliverytruck"
            />
            <div className="ctaTexts">
              <h1>We ship countrywide</h1>
              <p>You will get your bike no matter where you are!</p>
            </div>
          </div>
          <div className="ctaButton">
            <Link href="/delivery">More details</Link>
          </div>
        </div>
      </div>

      <div className="mCta">
        <h1>We ship countrywide</h1>
        <div className="ctacontent flexed">
          <p>
            You will get your bike <br />
            <span>No matter where you are!</span>
          </p>
          <Link href="/delivery" className="flexed ctaButt">
            <>
              <Image
                src="/Images/mdtruck.svg"
                alt="Delivery truck icon"
                width={20}
                height={20}
                className="ddeliverytruck"
              />
              More details
            </>
          </Link>
        </div>
      </div>
    </div>
  );
}
