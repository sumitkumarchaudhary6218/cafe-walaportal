"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const SocialButtons = dynamic(() => import("./SocialButtons"), {
  ssr: false,
});

const ScrollToTopButton = dynamic(
  () => import("./ScrollToTopButton0"),
  { ssr: false }
);

export default function WrapperLayout({ children }) {
  const pathname = usePathname();

  // dashboard route check
  const isDashboard = pathname.startsWith("/batting");

  return (
    <>
      {!isDashboard && <Header />}

      {!isDashboard && <SocialButtons />}


      {children}

      <ScrollToTopButton />

      {!isDashboard && <Footer />}
    </>
  );
}