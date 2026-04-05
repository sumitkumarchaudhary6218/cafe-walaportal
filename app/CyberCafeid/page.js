import React from 'react';
import { 
  CheckCircle, 
  ExternalLink, 
  Monitor, 
  CreditCard, 
  Smartphone, 
  Fingerprint, 
  Building2, 
  FileText, 
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

const CyberCafeGuide = () => {
  const services = [
    {
      id: 1,
      title: "CSC ID (Common Service Center)",
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      description: "Cyber Cafe खोलने के लिए सबसे जरूरी और पहली ID होती है।",
      points: [
        "Government services दे सकते हैं",
        "Aadhaar, PAN, Ayushman, Certificate जैसे काम कर सकते हैं",
        "एक ही जगह से कई services operate कर सकते हैं"
      ],
      link: "https://cscregister.csccloud.in/web/register",
      badge: "Foundation ID"
    },
    {
      id: 2,
      title: "PAN Card Service ID",
      icon: <CreditCard className="w-8 h-8 text-orange-600" />,
      description: "Cyber Cafe में सबसे ज्यादा demand PAN Card की होती है।",
      points: [
        "Direct PAN Apply कर सकते हैं",
        "Correction और Update कर सकते हैं",
        "Trusted service - Low payment risk"
      ],
      link: "https://panpoint.in",
      badge: "Must Have"
    },
    {
      id: 3,
      title: "SIM & Recharge ID",
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      description: "हर Cyber Cafe में SIM और Recharge service होना जरूरी है।",
      points: [
        "New SIM Activation",
        "SIM Port (MNP)",
        "Airtel Mitra & Jio POS Plus"
      ],
      link: "#",
      badge: "Daily Income"
    },
    {
      id: 4,
      title: "AEPS ID (Cash Withdrawal)",
      icon: <Fingerprint className="w-8 h-8 text-red-600" />,
      description: "बिना CSC के भी अंगूठे से पैसे निकालने की सुविधा दें।",
      points: [
        "Fingerprint से पैसा निकासी",
        "Balance Check & Mini Statement",
        "Spice Money / PayNearby"
      ],
      link: "#",
      badge: "Banking"
    },
    {
      id: 5,
      title: "Bank BC (Banking Point)",
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      description: "Cyber Cafe को Mini Bank में बदलें।",
      points: [
        "Savings Account Opening",
        "Money Transfer (DMT)",
        "Cash Deposit/Withdraw"
      ],
      link: "#",
      badge: "Trust"
    },
    {
      id: 6,
      title: "Service Plus (Bihar/State ID)",
      icon: <FileText className="w-8 h-8 text-teal-600" />,
      description: "आय, जाति, निवास प्रमाण पत्र बनाने के लिए जरूरी।",
      points: [
        "Certificate Apply (Income/Caste/Residence)",
        "Local Government services",
        "District Level Services"
      ],
      link: "https://serviceonline.bihar.gov.in/",
      badge: "Legal"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4 text-center shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            🚀 Cyber Cafe खोलने के लिए कौन-कौन सी ID जरूरी है?
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            Complete Step-by-Step Guide 2026: अपना डिजिटल बिजनेस आज ही शुरू करें।
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-6 py-2 text-sm font-medium">
            कमाई का बेहतरीन जरिया - जन सेवा केंद्र
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-12">
          <p className="text-lg leading-relaxed mb-4 text-gray-700">
            आज के समय में <strong>Cyber Cafe</strong> या <strong>Jan Seva Kendra</strong> खोलना एक बहुत ही बढ़िया कमाई का जरिया बन चुका है। लेकिन सबसे बड़ा सवाल यही होता है कि शुरुआत कहाँ से करें और कौन-कौन सी ID लेनी जरूरी होती है?
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            इस ब्लॉग में हम आपको बिल्कुल आसान भाषा में बताएंगे कि Cyber Cafe शुरू करने के लिए कौन-कौन सी IDs जरूरी हैं और कैसे आप एक-एक करके सभी services शुरू कर सकते हैं।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {item.icon}
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.id}. {item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-2 px-4 bg-white border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  Apply Link <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Final Conclusion Section */}
        <section className="mt-16 bg-indigo-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <BadgeCheck className="w-8 h-8 mr-3 text-yellow-400" />
              Final Conclusion
            </h2>
            <p className="text-lg mb-8 opacity-90">
              अगर आप Cyber Cafe खोलना चाहते हैं, तो आपको ज्यादा IDs लेने की जरूरत नहीं है। बस ये Essential IDs लेकर आप पूरा काम शुरू कर सकते हैं:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {["CSC ID", "PAN Card ID", "AEPS ID", "Bank BC", "IRCTC Agent", "Ayushman Card", "Service Plus"].map((tag, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-lg flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="font-medium">{tag}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-indigo-200 italic">
              इन सभी IDs के जरिए आप अपने Cyber Cafe को एक complete digital service center बना सकते हैं और अच्छी कमाई कर सकते हैं।
            </p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-700 rounded-full opacity-50 blur-3xl"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-20 text-gray-500 text-sm">
        <p>© 2026 Cyber Cafe Business Guide. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default CyberCafeGuide;