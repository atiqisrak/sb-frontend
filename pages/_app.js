import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { Switch } from "antd";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <div
      style={{
        backgroundColor: darkmode ? "#333" : "#fff",
        color: darkmode ? "#fff" : "#333",
        transition: "all 0.5s",
      }}
    >
      <Header darkmode={darkmode} />

      {/* Dark mode Light mode */}
      <Switch
        unCheckedChildren="🌙"
        checkedChildren="🌞"
        defaultChecked
        onChange={() => setDarkmode(!darkmode)}
        style={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}
      />
      <Component {...pageProps} darkmode={darkmode} />
      <Footer darkmode={darkmode} />
    </div>
  );
}
