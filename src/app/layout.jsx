import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import { metadata } from "./global/constants/metadata";
import { AuthProvider } from "./global/contexts/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
