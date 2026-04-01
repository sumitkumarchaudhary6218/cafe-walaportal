"use client";

import { useState } from "react";

// Latest Updates
const latestUpdates = [
  { id: 1, text: "📢 PAN Users Alert 🚨 | 1 April 2026 se New Rule लागू 😱 Aadhaar Ab DOB Proof Nahi ❌ PAN Reject Pakka!", url: "/panAlert" },
  { id: 1, text: "PAN Card Apply Process Changed 2026 ⚠️ अब ऐसे बनेगा पैन कार्ड", url: "#" },
  { id: 1, text: "अब ऐसे होगा Aadhaar Mobile Link 2026 | New Process Update 🔥", url: "#" },
  { id: 1, text: "ड्राइविंग लाइसेंस Apply 2026 कैसे करें", url: "#" },
  { id: 1, text: "आयुष्मान कार्ड Apply Online 2026 कैसे करें", url: "#" },
  { id: 1, text: "Top 5 सरकारी Loan योजना कौन-कौन सी हैं", url: "#" },
  { id: 1, text: "CSC Center कैसे खोलें 2026 में पूरी जानकारी", url: "#" },
  { id: 1, text: "E-Shram Card कैसे बनाएं 2026 में", url: "#" },
  { id: 1, text: "Voter Card कैसे बनाएं 2026 में", url: "#" },
  { id: 1, text: "आधार कार्ड में मोबाइल नंबर लिंक कैसे करें", url: "#" },
  { id: 1, text: "TEC Certificate कैसे बनाएं 2026 में", url: "#" },
  { id: 1, text: "Aadhaar Seeding Online 2026 कैसे करें", url: "#" },
  { id: 1, text: "PAN Card Apply कैसे करें", url: "#" },
]

// Latest Downloads
const latestDownloads = [
  { id: 1, text: "Voter ID Card Download 2026 : ऑनलाइन वोटर आईडी कार्ड कैसे डाउनलोड करें?", url: "https://voters.eci.gov.in/home/e-epic-download" },
  { id: 3, text: "Ayushman Card Download 2026 : आयुष्मान भारत कार्ड ऑनलाइन डाउनलोड कैसे करें?", url: "https://beneficiary.nha.gov.in/" },
  { id: 4, text: "Aadhaar Card Download : आधार कार्ड PDF ऑनलाइन डाउनलोड कैसे करें?", url: "https://myaadhaar.uidai.gov.in/genricDownloadAadhaar/en" },
  { id: 5, text: "E Shram Card Download 2026 : ई-श्रम कार्ड डाउनलोड और प्रिंट कैसे करें?", url: "https://register.eshram.gov.in/#/user/self" },
  { id: 6, text: "ABC ID Card Download : Academic Bank of Credit ID कार्ड डाउनलोड कैसे करें?", url: "https://www.digilocker.gov.in/web/dashboard/issuers/010212" },
  { id: 7, text: "Caste Certificate Download : जाति प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 8, text: "Income Certificate Download : आय प्रमाण पत्र डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 9, text: "Residence Certificate Download : निवास प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 10, text: "Birth Certificate Download : जन्म प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 11, text: "Death Certificate Download : मृत्यु प्रमाण पत्र ऑनलाइन डाउनलोड कैसे करें?", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },
  { id: 12, text: "Labour Card Download : लेबर कार्ड ऑनलाइन डाउनलोड कैसे करें?", url: "https://bocwscheme.bihar.gov.in/worker_login" },
  { id: 13, text: "Ration Card Download : बिहार राशन कार्ड ऑनलाइन डाउनलोड कैसे करें?", url: "https://epos.bihar.gov.in/SRC_Trans_Int.jsp" },
  { id: 14, text: "PM Kisan Beneficiary Status & Certificate Download कैसे करें?", url: "https://pmkisan.gov.in/BeneficiaryStatus_New.aspx" },
  { id: 15, text: "Driving Licence Download : DigiLocker / Parivahan से DL डाउनलोड कैसे करें?", url: "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" },
];

const latestDownloadCourse = [
  { id: 1, text: "Free Course 2026: Voter ID Card Download – Online E-EPIC Step-by-Step Guide", url: "https://voters.eci.gov.in/home/e-epic-download" },

  { id: 3, text: "Free Course 2026: Ayushman Card Download – Ayushman Bharat Card Full Process Guide", url: "https://beneficiary.nha.gov.in/" },

  { id: 4, text: "Free Course: Aadhaar Card Download – Aadhaar PDF Online Easy Method", url: "https://myaadhaar.uidai.gov.in/genricDownloadAadhaar/en" },

  { id: 5, text: "Free Course 2026: E Shram Card Download – Registration, Download & Print Guide", url: "https://register.eshram.gov.in/#/user/self" },

  { id: 6, text: "Free Course: ABC ID Card Download – Academic Bank of Credit ID Full Guide", url: "https://www.digilocker.gov.in/web/dashboard/issuers/010212" },

  { id: 7, text: "Free Course: Caste Certificate Download – Online Bihar RTPS Full Process", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },

  { id: 8, text: "Free Course: Income Certificate Download – Online Apply & Download Guide", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },

  { id: 9, text: "Free Course: Residence Certificate Download – Online Apply & Status Check", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },

  { id: 10, text: "Free Course: Birth Certificate Download – Online Process Step-by-Step", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },

  { id: 11, text: "Free Course: Death Certificate Download – Online Apply & Download Guide", url: "https://swcs.bihar.gov.in/RtpsReportView/certificate_download.jsp" },

  { id: 12, text: "Free Course: Labour Card Download – Bihar Labour Registration & Status Guide", url: "https://bocwscheme.bihar.gov.in/worker_login" },

  { id: 13, text: "Free Course: Ration Card Download – Bihar Ration Card Online Full Guide", url: "https://epos.bihar.gov.in/SRC_Trans_Int.jsp" },

  { id: 14, text: "Free Course: PM Kisan Status & Certificate – Beneficiary Check Full Guide", url: "https://pmkisan.gov.in/BeneficiaryStatus_New.aspx" },

  { id: 15, text: "Free Course: Driving Licence Download – DigiLocker & Parivahan DL Guide", url: "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" },
];

// NewsItem Component
function NewsItem({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.url}
      className={`
        flex items-start gap-2 px-3 py-2.5 rounded-md cursor-pointer
        transition-all duration-200 group border-b border-gray-100 last:border-b-0
        ${hovered ? "bg-orange-50" : "bg-white hover:bg-orange-50"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-orange-400 group-hover:bg-orange-600 transition-colors duration-200" />
      <span className="text-sm text-gray-700 group-hover:text-orange-700 leading-snug transition-colors duration-200">
        {item.text}
      </span>
    </a>
  );
}

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
// SectionCard Component
function SectionCard({ title, items, accentColor }) {
  const colors = colorVariants[accentColor] || colorVariants.update;

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white h-full hover:shadow-xl transition duration-300">
      
      {/* Header */}
      <div className={`px-4 py-3 flex items-center gap-2 ${colors.header}`}>
        <span className="text-white text-lg">{colors.icon}</span>

        <h2 className="text-white font-bold text-base tracking-wide uppercase">
          {title}
        </h2>

        <span className="ml-auto bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {items.length} new
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto max-h-[520px] divide-y divide-gray-50 scrollbar-thin scrollbar-thumb-gray-300">
        {items.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div className={`px-4 py-2 text-center border-t border-gray-100 ${colors.footer}`}>
        <a
          href="#"
          className={`text-xs font-semibold hover:underline ${colors.text}`}
        >
          View All →
        </a>
      </div>
    </div>
  );
}
// Main Page Component
export default function Disclaimerpage() {
  return (
    <section className="w-full bg-gray-50 py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        <SectionCard
          title="Latest Update"
          items={latestUpdates}
          accentColor="update"
        />
        <SectionCard
          title="Download ID Card & Certificate"
          items={latestDownloads}
          accentColor="download"
        />
        <SectionCard
          title="Free Course"
          items={latestDownloadCourse}
          accentColor="course"
        />
      </div>
    </section>
  );
}