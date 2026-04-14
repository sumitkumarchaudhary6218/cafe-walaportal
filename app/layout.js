import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WrapperLayout from "./component/WrapperLayout";
import Script from "next/script"; // ✅ ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SevaUpdates | Cyber Cafe Wala",
  description:
    "SevaUpdates पर PAN card resize, image compressor, background remover, file converter और सभी cyber cafe online tools एक ही जगह पर उपलब्ध हैं。",
  keywords: [
    "PAN card resize tool",
    "image compressor online",
    "background remover",
    "file converter",
    "cyber cafe tools",
    "online tools India",
    "SevaUpdates",
  ],
  metadataBase: new URL("https://sevaupdates.com"),
  openGraph: {
    title: "SevaUpdates Online Tools",
    description: "All cyber cafe tools and services in one place",
    url: "https://sevaupdates.com",
    siteName: "SevaUpdates",
    type: "website",
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

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-86J2VQR0KH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-86J2VQR0KH');
          `}
        </Script>

        {/* ✅ Wrapper */}
        <WrapperLayout>
          <main>{children}</main>
        </WrapperLayout>

      </body>
    </html>
  );
}