"use client";
import { useEffect, useState } from "react";

export default function PanNewsPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#111] px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Masthead */}
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide">
            PAN NEWS BULLETIN
          </h1>
         
        </div>

        {/* Headline */}
        <div className={`text-center mb-8 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
          <h2 className="text-2xl md:text-4xl font-serif font-bold leading-snug">
            📢 PAN Users Big Alert 2026 – पूरा सच जान लो वरना Application Reject!
          </h2>
           {/* ✅ BANNER ADD HERE */}
          <div className="my-5">
            <img
              src="/img/banner.jpg"   // 👈 yahan apna banner path daalo
              alt="PAN Update Banner"
              className="w-full h-auto rounded-md shadow-md border"
            />
          </div>
          <p className="italic text-gray-600 mt-3">
            Income-tax Amendment Rules 2026 के बाद PAN प्रक्रिया में बड़ा बदलाव
          </p>
        </div>

        {/* Article Layout */}
        <div className="grid md:grid-cols-3 gap-8 text-[15px] leading-relaxed font-serif">

          {/* LEFT COLUMN */}
          <div className="space-y-5">
            <Section title="🧾 महत्वपूर्ण सूचना">
              Protean eGov Technologies Ltd. द्वारा जारी नए नियमों के अनुसार PAN Application प्रक्रिया में बड़ा बदलाव किया गया है।
            </Section>

            <Section title="⚠️ सबसे बड़ा बदलाव">
              ❌ अब Aadhaar Card को DOB Proof के रूप में स्वीकार नहीं किया जाएगा।
            </Section>

            <Section title="📌 किन पर लागू?">
              • New PAN Application <br />
              • PAN Correction <br />
              • Change Request
            </Section>
          </div>

          {/* CENTER COLUMN */}
          <div className="space-y-5 border-x px-4">
            <Section title="💻 Mode Update">
              Aadhaar e-KYC और Scanned Mode — दोनों में अब Aadhaar invalid होगा।
            </Section>

            <Section title="📅 लागू तिथि">
              📢 01 अप्रैल 2026 से नियम लागू
            </Section>

            <Section title="❌ Reject कब होगा?">
              अगर Aadhaar DOB Proof दिया — Application सीधे reject।
            </Section>

            <Section title="📄 क्या जरूरी है?">
              ✔️ Valid DOB Proof <br />
              ✔️ Updated PAN Form <br />
              ✔️ Document verification
            </Section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            <Section title="📑 Valid Documents">
              Birth Certificate, Passport, Driving License, Voter ID, Matric Certificate आदि।
            </Section>

            <Section title="⚠️ Warning">
              Aadhaar देने पर 100% reject — पैसा और reputation दोनों risk में।
            </Section>

            <Section title="🎯 CSC / Cyber Cafe">
              हर application से पहले DOB Proof verify करें।
            </Section>

            <Section title="🚨 Conclusion">
              यह PAN process का game change है — update नहीं हुए तो काम बंद।
            </Section>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t mt-10 pt-4 text-center font-serif">
          <p className="text-sm">🙏 धन्यवाद</p>
          <p className="font-bold">Team PanPoint</p>
        </div>

      </div>
    </div>
  );
}

/* Section */
function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-800">{children}</p>
    </div>
  );
}