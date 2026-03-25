"use client";

import dynamic from "next/dynamic";

// ✅ Dynamic imports allowed here
const SocialButtons = dynamic(() => import("./SocialButtons"), {
  ssr: false,
});

const ScrollToTopButton = dynamic(
  () => import("./ScrollToTopButton0"),
  { ssr: false }
);

export default function WrapperLayout({ children }) {
  return (
    <>
      <SocialButtons />
      {children}
      <ScrollToTopButton />
    </>
  );
}