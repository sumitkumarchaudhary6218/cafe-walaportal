import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./component/Header";
import Footer from "./component/Footer";
import WrapperLayout from "./component/WrapperLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cyber Cafe Wala",
  description: "Cyber Cafe Walo Ka Apna Portal",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <Header />

        {/* ✅ Client wrapper handles dynamic components */}
        <WrapperLayout>
          <main>{children}</main>
        </WrapperLayout>

        <Footer />

      </body>
    </html>
  );
}