import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "SevaUpdates |Cyber Cafe Wala  ",





};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {/* 🔥 ORGANIZATION SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SevaUpdates",
              url: "https://sevaupdates.com",
              logo: "https://sevaupdates.com/logo.png",
            }),
          }}
        />





        {/* ✅ Wrapper */}
        <WrapperLayout>
          <main>{children}</main>
        </WrapperLayout>

      </body>
    </html>
  );
}