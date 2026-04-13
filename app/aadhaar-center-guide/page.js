"use client";

import React from "react";

export default function AadhaarCenterGuide() {
  return (
    <div className="min-h-screen  py-6 px-4">
      <div className="max-w-4xl mx-auto  rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          🪪 आधार सेंटर कैसे लें?
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-6">
          Aadhaar Center Registration Process 2026 (पूरी जानकारी)
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          दोस्तों अगर आप भी एक साइबर कैफे चलाते हैं या नया खोलने की सोच रहे हैं,
          तो आपके मन में जरूर यह सवाल आता होगा कि आधार सेंटर कैसे लिया जाता है।
        </p>

        {/* Intro */}
        <Section title="📌 आधार काम क्यों जरूरी है?">
          <ul className="list-disc ml-6 space-y-1">
            <li>नया आधार बनाना</li>
            <li>आधार अपडेट</li>
            <li>मोबाइल नंबर लिंक</li>
            <li>बायोमेट्रिक अपडेट</li>
          </ul>

          <p className="mt-3 text-green-600 font-medium">
            👉 आधार सेंटर होने से आपकी कमाई कई गुना बढ़ सकती है।
          </p>
        </Section>

        {/* Methods */}
        <Section title="🔥 आधार सेंटर लेने के 2 तरीके">
          <ul className="space-y-2">
            <li>1️⃣ CSC ID के माध्यम से</li>
            <li>2️⃣ बैंक/एजेंसी के माध्यम से</li>
          </ul>

          <p className="mt-3">
            👉 95%–98% सेंटर CSC के माध्यम से चलते हैं
          </p>
        </Section>

        {/* Method 1 */}
        <Section title="🥇 तरीका 1: CSC ID के माध्यम से">
          
          <SubTitle title="👉 Step 1: CSC ID लेना" />
          <p>CSC ID होना अनिवार्य है।</p>

          <SubTitle title="👉 Step 2: काम करें (6–12 महीने)" />
          <ul className="list-disc ml-6">
            <li>ज्यादा ट्रांजेक्शन करें</li>
            <li>ID active रखें</li>
          </ul>

          <SubTitle title="👉 Step 3: Bank BC बनें" />
          <p>IIBF सर्टिफिकेट + एग्जाम जरूरी</p>

          <SubTitle title="👉 Step 4: LMS Certificate" />
          <ul className="list-disc ml-6">
            <li>UIDAI से e-learning</li>
            <li>एग्जाम पास</li>
            <li>ID + Password मिलता है</li>
          </ul>

          <SubTitle title="👉 Step 5: NSEIT Exam" />
          <ul className="list-disc ml-6">
            <li>रजिस्ट्रेशन करें</li>
            <li>सेंटर पर एग्जाम दें</li>
            <li>पास होने पर सर्टिफिकेट</li>
          </ul>

          <SubTitle title="👉 Step 6: CSC DM से संपर्क" />
          <p>सभी सर्टिफिकेट दिखाकर आवेदन करें</p>

          <SubTitle title="👉 Step 7: आवेदन" />
          <p>एरिया availability के अनुसार approval मिलेगा</p>

        </Section>

        {/* Cost */}
        <Section title="💰 खर्च कितना लगता है?">
          <ul className="list-disc ml-6 space-y-1">
            <li>Fingerprint Device: ₹40,000 – ₹45,000</li>
            <li>Iris Scanner: ₹5,000 – ₹7,000</li>
            <li>Computer: ₹25,000 – ₹40,000</li>
            <li>Printer/Scanner: ₹10,000 – ₹15,000</li>
            <li>CCTV: ₹5,000 – ₹10,000</li>
            <li>Furniture: ₹10,000 – ₹20,000</li>
          </ul>

          <p className="mt-3 font-semibold text-red-600">
            👉 Total: ₹1,00,000 – ₹1,50,000+
          </p>
        </Section>

        {/* Method 2 */}
        <Section title="🥈 तरीका 2: बैंक / एजेंसी">
          
          <SubTitle title="👉 बैंक के माध्यम से" />
          <p>बैंक में बैठकर काम करना होगा</p>

          <SubTitle title="👉 एजेंसी के माध्यम से" />
          <ul className="list-disc ml-6">
            <li>₹2–3 लाख खर्च</li>
            <li>Fraud का खतरा</li>
          </ul>

          <p className="mt-3 text-red-600 font-medium">
            ❌ बिना verify पैसे न दें
          </p>
        </Section>

        {/* Docs */}
        <Section title="📄 जरूरी डॉक्यूमेंट्स">
          <ul className="list-disc ml-6">
            <li>Aadhaar Card</li>
            <li>PAN Card</li>
            <li>Police Verification</li>
            <li>Address Proof</li>
            <li>Certificates (LMS + NSEIT)</li>
          </ul>
        </Section>

        {/* Best */}
        <Section title="⚡ सबसे बेस्ट तरीका">
          <p className="text-green-600 font-semibold">
            ✅ CSC ID वाला तरीका
          </p>

          <ul className="list-disc ml-6 mt-2">
            <li>सुरक्षित</li>
            <li>कम रिस्क</li>
            <li>long-term फायदा</li>
          </ul>
        </Section>

        {/* Conclusion */}
        <div className="mt-8 bg-blue-50 p-5 rounded-xl border">
          <h3 className="text-lg font-semibold mb-3">🎯 निष्कर्ष</h3>

          <ul className="list-disc ml-6 space-y-1">
            <li>CSC ID लें</li>
            <li>अच्छा काम करें</li>
            <li>BC बनें</li>
            <li>LMS + NSEIT पास करें</li>
          </ul>

          <p className="mt-4 font-semibold text-blue-700">
            👉 आधार सेंटर पाना मुश्किल है, लेकिन नामुमकिन नहीं।
          </p>
        </div>

        {/* Final Advice */}
        <div className="mt-6 bg-yellow-50 p-5 rounded-xl border">
          <h3 className="text-lg font-semibold mb-2">📢 Final Advice</h3>

          <ul className="list-disc ml-6 space-y-1">
            <li>धैर्य रखें</li>
            <li>सही प्रोसेस फॉलो करें</li>
            <li>गलत रास्ता न अपनाएं</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

/* Section */
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
        {title}
      </h3>
      <div className="text-gray-700 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

/* Subtitle */
function SubTitle({ title }) {
  return (
    <h4 className="font-semibold text-gray-800 mt-4 mb-1">
      {title}
    </h4>
  );
}