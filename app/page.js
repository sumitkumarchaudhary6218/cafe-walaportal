"use client";
import { useState } from "react";
import Disclaimer from "./component/Disclaimer";
import DisclaimerPage from "./component/Disclaimerpage";
import Marquee from "./component/Marquee";
import Loader from "./component/Loader";

const gridLinks = [
  {
    text: "CSC रजिस्ट्रेशन (CSC Registration / Digital Seva)",
    href: "https://cscregister.csccloud.in/",
    btn: "Register Now / अभी रजिस्टर करें",
  },
  {
    text: "(TEC)Telecenter Entrepreneur Course",
    href: "https://cscentrepreneur.in/register",
    btn: "Enroll Now / अभी एनरोल करें",
  },
  {
    text: "पैन कार्ड बनाना (Pan Card Apply)",
    href: "https://panpoint.in",
    btn: "Apply Now / अभी आवेदन करें",
  },
  {
    text: "आधार DBT करें",
    href: "https://www.npci.org.in/",
    btn: "Apply Now",
  },
  {
    text: "Aadhaar Operator Registration (आधार ऑपरेटर पंजीकरण)",
    href: "https://uidai.nseitexams.com/UIDAI/LoginAction_input.action",
    btn: "Register Now / अभी पंजीकरण करें",
  },
  {
    text: "LMS ID & Password Registration (LMS आईडी और पासवर्ड पंजीकरण)",
    href: "https://e-learning.uidai.gov.in/login/index.php",
    btn: "Register Now / अभी पंजीकरण करें",
  },
  {
    text: "Pan Card Document Resize (पैन कार्ड डॉक्यूमेंट रिसाइज)",
    href: "https://pancardresizer.com/",
    btn: "Resize Now / अभी रिसाइज करें",
  },
  {
    text: "UTI Pan Card Download (UTI पैन कार्ड डाउनलोड)",
    href: "https://www.pan.utiitsl.com/PAN_ONLINE/ePANCardHome",
    btn: "Download Now / डाउनलोड करें",
  },
  {
    text: "फोटो रिसाइज सेवा (Photo Resize Service)",
    href: "https://image.pi7.org/",
    btn: "Apply Now",
  },
  {
    text: "पैन कार्ड डाउनलोड (Pan Card Download)",
    href: "https://onlineservices.proteantech.in/paam/requestAndDownloadEPAN.html",
    btn: "Download / डाउनलोड करें",
  },
  {
    text: "आयुष्मान कार्ड सभी सेवाएं (Ayushman Card All Services)",
    href: "http://beneficiary.nha.gov.in/",
    btn: "Apply / Check Services",
  },
  {
    text: "ड्राइविंग लाइसेंस सभी सेवाएं (DL Apply / All Services)",
    href: "https://parivahan.gov.in/",
    btn: "Apply Now / सभी सेवाएं",
  },
  {
    text: "पासपोर्ट सेवा (Passport Seva)",
    href: "https://www.passportindia.gov.in/psp",
    btn: "Apply Now / पासपोर्ट आवेदन",
  },
  {
    text: "जमीन की सभी सेवाएं (Land Records / Jamin Services)",
    href: "https://biharbhumi.bihar.gov.in/Biharbhumi/",
    btn: "Check Now / जमीन देखें",
  },
  {
    text: "PF सभी सेवाएं (PF All Services)",
    href: "https://www.epfindia.gov.in/site_en/",
    btn: "Check / Apply PF Services",
  },
  {
    text: "किसान पंजीकरण (Kisan Registration)",
    href: "https://dbtagriculture.bihar.gov.in/",
    btn: "Register / पंजीकरण करें",
  },
  {
    text: "ई-श्रम कार्ड Apply (e-Shram Card Registration)",
    href: "https://eshram.gov.in/indexmain",
    btn: "Apply Now / ई-श्रम बनाएं",
  },
  {
    text: "वोटर कार्ड सभी सेवाएं (Voter Card All Services)",
    href: "https://voters.eci.gov.in/",
    btn: "Apply / Check Voter Services",
  },
  {
    text: "उद्यम पंजीकरण (Udyam Registration / MSME)",
    href: "https://udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm",
    btn: "Register / Udyam Apply",
  },
  {
    text: "APC ID कार्ड Apply (APC ID Card)",
    href: "https://digilocker.app/abcid.html",
    btn: "Apply Now / APC ID बनाएं",
  },
  {
    text: "बिजली सभी सेवाएं (Electricity / Bijli All Services)",
    href: "https://nbpdcl.co.in/(S(i0mfoauargoiacirscuihlts))/frmhome.aspx",
    btn: "Pay / Check / Apply",
  },
  {
    text: "इमेज बैकग्राउंड रिमूव (Image BG Remove)",
    href: "https://www.photoroom.com/tools/background-remover",
    btn: "Remove Now / बैकग्राउंड हटाएँ",
  },
  {
    text: "आय / जाति / निवास प्रमाण पत्र Apply (Income / Caste / Residence Certificate)",
    href: "https://serviceonline.bihar.gov.in/",
    btn: "Apply Now / आवेदन करें",
  },
  {
    text: "पुलिस सेवाएं (Police Services / FIR, Certificate)",
    href: "https://serviceonline.bihar.gov.in/renderApplicationForm.do?serviceId=12050016&UUID=714a9822-7089-4f86-9893-a2f83d3e3a67&directService=true&tempId=4236&grievDefined=0&serviceLinkRequired=No&userLoggedIn=N&source=CTZN&OWASP_CSRFTOKEN=9OWW-0Y48-ZTVU-Y302-RBV2-1AZ5-9UV6-BHRJ",
    btn: "Apply / Register / Check Status",
  },
];

export default function OnlineUpdateSTM() {

  const [loading, setLoading] = useState(false);
  return (
    <> 
    <div className="bg-amber-50 min-h-screen flex flex-col">
      <Marquee />

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1">
        <div className="grid grid-cols-2 py-12 md:grid-cols-4 gap-4  overflow-hidden ">

          {gridLinks.map((link, i) => {
            const hue = (i * 137.5) % 360;
            const bg = `hsl(${hue}, 65%, 45%)`;
            const hoverBg = `hsl(${hue}, 65%, 35%)`;

            return (
              <a
              onClick={()=>setLoading(true)}
                key={i}
                href={link.href}
                style={{ backgroundColor: bg }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = bg)
                }
                className="font-semibold text-white text-center text-xs sm:text-sm px-4 py-6 border border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center rounded-xl shadow-md"              >
                {link.text}
              </a>
            );
          })}
        </div>
      </main>

      <DisclaimerPage />
      <Disclaimer />
    </div>
    {loading && <Loader />}
    </>
  );
}