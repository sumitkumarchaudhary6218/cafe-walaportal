"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- DATA ARRAYS ---
const latestUpdates = [
  { id: 1, text: "📢 PAN Users Alert 🚨 | 1 April 2026 se New Rule लागू 😱 Aadhaar Ab DOB Proof Nahi ❌ PAN Reject Pakka!", url: "/panAlert" },
  { id: 2, text: "PAN Card Apply Process Changed 2026 ⚠️ अब ऐसे बनेगा पैन कार्ड", url: "#" },
  { id: 3, text: "अब ऐसे होगा Aadhaar Mobile Link 2026 | New Process Update 🔥", url: "#" },
  { id: 4, text: "ड्राइविंग लाइसेंस Apply 2026 कैसे करें", url: "#" },
  { id: 5, text: "आयुष्मान कार्ड Apply Online 2026 कैसे करें", url: "#" },
  { id: 6, text: "Top 5 सरकारी Loan योजना कौन-कौन सी हैं", url: "#" },
  { id: 7, text: "CSC Center कैसे खोलें 2026 में पूरी जानकारी", url: "#" },
  { id: 8, text: "E-Shram Card कैसे बनाएं 2026 में", url: "#" },
  { id: 9, text: "Voter Card कैसे बनाएं 2026 में", url: "#" },
  { id: 10, text: "आधार कार्ड में मोबाइल नंबर लिंक कैसे करें", url: "#" },
  { id: 11, text: "TEC Certificate कैसे बनाएं 2026 में", url: "#" },
  { id: 12, text: "Aadhaar Seeding Online 2026 कैसे करें", url: "#" },
  { id: 13, text: "PAN Card Apply कैसे करें", url: "#" },
];

const latestDownloads = [
  { id: 1, text: "Voter ID Card Download 2026 : ऑनलाइन वोटर आईडी कार्ड कैसे डाउनलोड करें?", url: "https://voters.eci.gov.in/home/e-epic-download" },
  { id: 2, text: "Ayushman Card Download 2026 : आयुष्मान भारत कार्ड ऑनलाइन डाउनलोड कैसे करें?", url: "https://beneficiary.nha.gov.in/" },
  { id: 3, text: "Aadhaar Card Download : आधार कार्ड PDF ऑनलाइन डाउनलोड कैसे करें?", url: "https://myaadhaar.uidai.gov.in/genricDownloadAadhaar/en" },
  { id: 4, text: "E Shram Card Download 2026 : ई-श्रम कार्ड डाउनलोड और प्रिंट कैसे करें?", url: "https://register.eshram.gov.in/#/user/self" },
  { id: 5, text: "ABC ID Card Download : Academic Bank of Credit ID कार्ड डाउनलोड कैसे करें?", url: "https://www.digilocker.gov.in/web/dashboard/issuers/010212" },
  { id: 6, text: "Caste Certificate Download : जाति प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 7, text: "Income Certificate Download : आय प्रमाण पत्र डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 8, text: "Residence Certificate Download : निवास प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 9, text: "Birth Certificate Download : जन्म प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 10, text: "Death Certificate Download : मृत्यु प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 11, text: "Labour Card Download : लेबर कार्ड ऑनलाइन डाउनलोड कैसे करें?", url: "https://bocwscheme.bihar.gov.in/worker_login" },
  { id: 12, text: "Ration Card Download : बिहार राशन कार्ड ऑनलाइन डाउनलोड कैसे करें?", url: "https://epos.bihar.gov.in/SRC_Trans_Int.jsp" },
  { id: 13, text: "PM Kisan Beneficiary Status & Certificate Download कैसे करें?", url: "https://pmkisan.gov.in/BeneficiaryStatus_New.aspx" },
  { id: 14, text: "Driving Licence Download : DigiLocker / Parivahan से DL डाउनलोड कैसे करें?", url: "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" },
];

const latestDownloadCourse = [
  { id: 1, text: "Cyber Cafe कैसे खोलें (2026 Guide)", url: "/cybercafe" },
  { id: 2, text: "Cyber Cafe के लिये कौन-कौन से ID लें।", url: "/CyberCafeid" },
  { id: 3, text: "Cyber Cafe के लिये बेस्ट प्रिंटर कौन रहेगा।", url: "/printerguide" },
  { id: 4, text: " Cyber Cafe के लिये बेस्ट Lamination और मशीन कौन रहेगा!", url: "/laminationguide" },
  { id: 5, text: "Cyber Cafe के लिये बेस्ट Biometric-Device/mantra vs/morpho?", url: "/biometricpage" },
  { id: 6, text: "Cyber Cafe के लिये बेस्ट Photo-Paper और Paper-कागज कौन रहेगा।", url: "/guidepapper" },
  { id: 7, text: "Cyber Cafe के लिये बेस्ट Location कहा रहेगा!", url: "/locationguide" },
  { id: 8, text: "Cyber Cafe के लिये कितना रुपया लगेगा! 2026 में", url: "/budgetguide" },
  { id: 9, text: "TEC Certificate कैसे लें", url: "/tecguide" },
  { id: 10, text: "LMS ID Password कैसे लें", url: "/lmsguide" },
  { id: 11, text: "CSC ID कैसे लें", url: "/csc-guide" },
  { id: 12, text: "Bank BC कैसे लें", url: "/bank-bc-guide" },
  { id: 13, text: "Aadhaar Centre कैसे खोले", url: "/aadhaar-center-guide" },
  { id: 14, text: "IRCTC Agent ID कैसे लें", url: "/irctc-agent-guide" },
  { id: 15, text: "Voter ID Registration कैसे करें", url: "/voter-id-guide" },
  { id: 16, text: "Ayushman Card Operator ID कैसे लें", url: "/ayushman-operator-guide" },
  { id: 17, text: "Airtel Mitra ID कैसे लें / Jio POS Plus ID कैसे लें", url: "/sim-card-guide" },
  { id: 18, text: "Airtel Payment Bank CSP ID कैसे लें", url: "/airtel-payment-bank-guide" },
  { id: 19, text: "AEPS ID कैसे लें", url: "/aeps-guide" },
];

// --- COLORS ---
const colorVariants = {
  update: {
    header: "bg-gradient-to-r from-blue-700 to-blue-500",
    footer: "bg-blue-50",
    text: "text-blue-600 hover:text-blue-800",
    icon: "🔔",
  },
  download: {
    header: "bg-gradient-to-r from-green-700 to-green-500",
    footer: "bg-green-50",
    text: "text-green-600 hover:text-green-800",
    icon: "📥",
  },
  course: {
    header: "bg-gradient-to-r from-purple-700 to-purple-500",
    footer: "bg-purple-50",
    text: "text-purple-600 hover:text-purple-800",
    icon: "🎓",
  },
};

// --- ITEM ---
function NewsItem({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(item.url)}
      className={`flex items-start gap-2 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 group border-b border-gray-100 last:border-b-0 ${
        hovered ? "bg-orange-50" : "bg-white hover:bg-orange-50"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 group-hover:bg-orange-600" />
      <span className="text-sm text-gray-700 group-hover:text-orange-700">
        {item.text}
      </span>
    </div>
  );
}

// --- CARD ---
function SectionCard({ title, items, accentColor, isExpanded, onToggle, onItemClick }) {
  const colors = colorVariants[accentColor] || colorVariants.update;

  return (
    <div className={`flex flex-col rounded-xl overflow-hidden shadow-md border bg-white ${isExpanded ? "w-full" : "hover:shadow-xl"}`}>
      
      <div className={`px-4 py-3 flex items-center gap-2 ${colors.header}`}>
        <span className="text-white text-lg">{colors.icon}</span>
        <h2 className="text-white font-bold text-base uppercase">{title}</h2>
        <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      <div className={`${isExpanded ? "" : "max-h-[500px] overflow-y-auto"}`}>
        {items.map((item) => (
          <NewsItem key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>

      <div className={`px-4 py-2 text-center ${colors.footer}`}>
        <button onClick={onToggle} className={`text-xs font-semibold ${colors.text}`}>
          {isExpanded ? "← Back" : "View All →"}
        </button>
      </div>
    </div>
  );
}

// --- MAIN ---
export default function Disclaimerpage() {
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sections = [
    { id: "update", title: "Latest Update", items: latestUpdates, color: "update" },
    { id: "download", title: "Download ID Card & Certificate", items: latestDownloads, color: "download" },
    { id: "course", title: "Free Course", items: latestDownloadCourse, color: "course" },
  ];

  const visibleSections = expandedId
    ? sections.filter((s) => s.id === expandedId)
    : sections;

  const handleNavigation = (url) => {
    if (!url || url === "#") return;

    setLoading(true);

    if (url.startsWith("http")) {
      setTimeout(() => {
        window.open(url, "_blank");
        setLoading(false);
      }, 800);
    } else {
      setTimeout(() => {
        router.push(url);
      }, 800);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-6 px-3">

      {/* 🔥 LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className={`grid gap-5 ${expandedId ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}>
          {visibleSections.map((sec) => (
            <SectionCard
              key={sec.id}
              title={sec.title}
              items={sec.items}
              accentColor={sec.color}
              isExpanded={expandedId === sec.id}
              onToggle={() =>
                setExpandedId(expandedId === sec.id ? null : sec.id)
              }
              onItemClick={handleNavigation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}