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
  title: "SevaUpdates | RTPS Bihar, Caste & Income Certificate Services",
  description:
    "SevaUpdates पर RTPS Bihar सेवाएं जैसे जाति प्रमाण पत्र, आय प्रमाण पत्र और आवेदन की स्थिति ऑनलाइन देखें।",

  keywords: [
    "sevaupdates",
    "RTPS Bihar",
    "caste certificate online",
    "income certificate bihar",
    "online service bihar",
  ],

  openGraph: {
    title: "SevaUpdates",
    description: "सभी सरकारी सेवाएं एक जगह",
    url: "https://sevaupdates.com",
    siteName: "SevaUpdates",
    type: "website",
  },

  alternates: {
    canonical: "https://sevaupdates.com",
  },
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

        {/* 🔥 ITEM LIST (RTPS SERVICES) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "आवेदन की स्थिति देखें",
                  url: "https://sevaupdates.com/rtps-status",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "जाति प्रमाण-पत्र",
                  url: "https://sevaupdates.com/caste-certificate",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "आय प्रमाण-पत्र",
                  url: "https://sevaupdates.com/income-certificate",
                },
              ],
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