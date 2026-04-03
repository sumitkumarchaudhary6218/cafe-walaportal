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
  title: "Cyber Cafe Wala | RTPS, Certificate Services",
  description:
    "RTPS Bihar services जैसे जाति प्रमाण पत्र, आय प्रमाण पत्र और आवेदन स्थिति ऑनलाइन देखें।",

  keywords: [
    "RTPS Bihar",
    "जाति प्रमाण पत्र",
    "आय प्रमाण पत्र",
    "Cyber Cafe",
    "Online Service Bihar",
  ],

  openGraph: {
    title: "Cyber Cafe Wala",
    description: "सभी सरकारी सेवाएं एक जगह",
    url: "https://yourdomain.com",
    siteName: "Cyber Cafe Wala",
    type: "website",
  },

  alternates: {
    canonical: "https://yourdomain.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
   

        {/* ✅ Client wrapper handles dynamic components */}
        <WrapperLayout>
          <main>{children}</main>
        </WrapperLayout>

       

      </body>
    </html>
  );
}