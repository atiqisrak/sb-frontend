import React, { createContext, useState } from "react";

const BrandContext = createContext({ brandData: null });

const BrandProvider = ({ children }) => {
  const [brandData, setBrandData] = useState(null);

  return (
    <BrandContext.Provider value={{ brandData, setBrandData }}>
      {children}
    </BrandContext.Provider>
  );
};

export { BrandContext, BrandProvider };
