"use client";

import React from "react";

export default function CSCGuidePage() {
  return (
    <div className="min-h-screen  py-6 ">
      <div className="max-w-4xl mx-auto  rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          📢 साइबर कैफे वालों के लिए पूरी जानकारी:
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-6">
          CSC ID कैसे प्राप्त करें? (Step-by-Step Guide)
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          दोस्तों, अगर आप एक साइबर कैफे चलाते हैं या नया साइबर कैफे खोलने की सोच रहे हैं,
          तो यह आर्टिकल आपके लिए बेहद महत्वपूर्ण है। आज हम विस्तार से समझेंगे कि CSC ID
          (Common Service Center ID) कैसे प्राप्त किया जाता है।
        </p>

        {/* Section */}
        <Section title="🔍 CSC क्या है?">
          <p>
            CSC का फुल फॉर्म है – <strong>Common Service Center</strong>
          </p>
          <p className="mt-2">
            यह भारत सरकार की एक पहल है जिसके माध्यम से डिजिटल सेवाएं लोगों तक पहुंचाई जाती हैं:
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>आधार कार्ड सेवाएं</li>
            <li>पैन कार्ड</li>
            <li>आय, जाति, निवास प्रमाण पत्र</li>
            <li>बिजली बिल भुगतान</li>
            <li>बैंकिंग सेवाएं</li>
            <li>70+ सेवाएं</li>
          </ul>

          <p className="mt-3 font-medium text-green-600">
            👉 CSC ID मिलने के बाद आपका कैफे एक डिजिटल सेवा केंद्र बन जाता है।
          </p>
        </Section>

        {/* Section */}
        <Section title="🎓 TEC Certificate क्या है?">
          <p>
            CSC ID लेने के लिए सबसे जरूरी चीज है <strong>TEC Certificate</strong>
          </p>
          <p className="mt-2">
            TEC = Telecentre Entrepreneur Course (ऑनलाइन कोर्स + एग्जाम)
          </p>
        </Section>

        {/* Section */}
        <Section title="💰 TEC Certificate फीस">
          <p>
            👉 ₹1479 (लगभग)
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>कोर्स एक्सेस</li>
            <li>एग्जाम</li>
            <li>सर्टिफिकेट डाउनलोड</li>
          </ul>
        </Section>

        {/* Section */}
        <Section title="📝 TEC Certificate कैसे लें?">
          <ol className="list-decimal ml-6 space-y-2">
            <li>ऑनलाइन रजिस्ट्रेशन करें</li>
            <li>₹1479 फीस पेमेंट करें</li>
            <li>कोर्स पढ़ें</li>
            <li>ऑनलाइन एग्जाम दें</li>
            <li>सर्टिफिकेट डाउनलोड करें</li>
          </ol>
        </Section>

        {/* Section */}
        <Section title="📄 जरूरी डॉक्यूमेंट्स">
          <ul className="list-disc ml-6 space-y-1">
            <li>आधार कार्ड</li>
            <li>वोटर आईडी</li>
            <li>पैन कार्ड</li>
            <li>पुलिस वेरिफिकेशन</li>
            <li>मोबाइल नंबर</li>
            <li>ईमेल आईडी</li>
            <li>पासपोर्ट फोटो</li>
            <li>कम से कम 10वीं पास</li>
          </ul>
        </Section>

        {/* Section */}
        <Section title="🎥 CSC Registration Process">
          <ol className="list-decimal ml-6 space-y-2">
            <li>ऑनलाइन रजिस्ट्रेशन करें</li>
            <li>डॉक्यूमेंट्स अपलोड करें</li>
            <li>फॉर्म सबमिट करें</li>
            <li>Reference Number प्राप्त करें</li>
          </ol>
        </Section>

        {/* Section */}
        <Section title="📱 वीडियो वेरिफिकेशन">
          <ul className="list-disc ml-6 space-y-2">
            <li>CSC ऐप डाउनलोड करें</li>
            <li>Reference Number डालें</li>
            <li>OTP से लॉगिन करें</li>
          </ul>

          <p className="mt-3 font-medium">🎬 कैसे करें:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>दुकान के सामने वीडियो बनाएं</li>
            <li>A4 पेपर पर लिखें:</li>
            <li>Reference Number</li>
            <li>Aadhaar Number</li>
            <li>PAN Number</li>
            <li>वीडियो अपलोड करें</li>
          </ul>
        </Section>

        {/* Section */}
        <Section title="⏱️ CSC ID कब मिलेगी?">
          <p>
            👉 24–48 घंटे के अंदर आपकी CSC ID ईमेल पर भेज दी जाती है।
          </p>
        </Section>

        {/* Section */}
        <Section title="⚠️ Important Update">
          <p>
            CSC Registration अभी अस्थायी रूप से बंद है।
          </p>
          <p className="mt-2 text-green-600 font-medium">
            👉 जल्द ही फिर से शुरू होने की संभावना है।
          </p>
        </Section>

        {/* Conclusion */}
        <div className="mt-8 bg-blue-50 p-5 rounded-xl border">
          <h3 className="text-lg font-semibold mb-3">🎯 निष्कर्ष</h3>

          <ul className="list-disc ml-6 space-y-1">
            <li>TEC Certificate लें</li>
            <li>डॉक्यूमेंट्स तैयार करें</li>
            <li>CSC के लिए आवेदन करें</li>
            <li>वीडियो वेरिफिकेशन करें</li>
          </ul>

          <p className="mt-4 font-semibold text-blue-700">
            👉 इसके बाद आप अपना साइबर कैफे डिजिटल सेवा केंद्र बना सकते हैं।
          </p>
        </div>

      </div>
    </div>
  );
}

/* Reusable Section Component */
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