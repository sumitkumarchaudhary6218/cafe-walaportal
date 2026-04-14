export const metadata = {
  title: "Top 5 सरकारी Loan योजना 2026",
};

export default function TopLoanYojanaPage() {
  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-5xl mx-auto  rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          💰 Top 5 सरकारी Loan योजना कौन-कौन सी हैं? (2026 Guide)
        </h1>

        <p className="text-gray-600 mb-6">
          अगर आप बिजनेस शुरू करना चाहते हैं या अपने काम को बढ़ाना चाहते हैं,
          तो सरकार की ये लोन योजनाएं आपके लिए बहुत फायदेमंद हो सकती हैं।
        </p>

        {/* Section */}
        <div className="space-y-8">

          {/* 1 */}
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🥇 Pradhan Mantri Mudra Yojana (PMMY)
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>₹50,000 से ₹20 लाख तक लोन</li>
              <li>कोई गारंटी नहीं</li>
              <li>छोटे बिजनेस के लिए बेस्ट</li>
            </ul>
          </div>

          {/* 2 */}
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🥈 PMEGP Scheme
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>₹20 लाख – ₹50 लाख तक लोन</li>
              <li>15%–35% सब्सिडी</li>
              <li>नए बिजनेस के लिए बेस्ट</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🥉 CGTMSE Scheme
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Collateral-free loan</li>
              <li>सरकार guarantee देती है</li>
              <li>Business expansion के लिए बेस्ट</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🏅 Stand-Up India Scheme
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>₹10 लाख – ₹1 करोड़</li>
              <li>महिला और SC/ST के लिए</li>
              <li>बड़े बिजनेस के लिए अच्छा</li>
            </ul>
          </div>

          {/* 5 */}
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🎖️ PM Vishwakarma Yojana
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Low interest loan (~5%)</li>
              <li>Skill + Training support</li>
              <li>कारीगरों के लिए बेस्ट</li>
            </ul>
          </div>

        </div>

        {/* Conclusion */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">🎯 निष्कर्ष</h2>
          <p className="text-gray-700">
            सही योजना चुनकर आप कम ब्याज में लोन लेकर अपने बिजनेस को आसानी से
            आगे बढ़ा सकते हैं।
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-sm text-gray-500">
          ⚠️ Disclaimer: यह जानकारी सामान्य उद्देश्य के लिए है। कृपया आवेदन से पहले official वेबसाइट से जानकारी verify करें।
        </div>

      </div>
    </div>
  );
}