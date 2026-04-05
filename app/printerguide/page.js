import React from 'react';
import {
    Printer,
    CheckCircle2,
    Wifi,
    Usb,
    ShoppingCart,
    Info,
    Zap,
    ShieldCheck,
    Smartphone
} from 'lucide-react';

const PrinterGuide = () => {
    const canonPrinters = [
        {
            name: "Canon Pixma G2012",
            tag: "Best Budget Printer",
            price: "₹12,000",
            features: ["USB Connection", "Ink Tank System", "Print + Scan + Copy", "Low Cost Printing"],
            cons: ["No WiFi Support"],
            link: "https://fktr.in/17mCSaQ",
            recommended: true
        },
        {
            name: "Canon Pixma G3012",
            tag: "WiFi Support",
            price: "₹14,000",
            features: ["WiFi Support", "Direct Mobile Print", "Ink Tank System", "Print + Scan + Copy"],
            cons: [],
            link: "https://fktr.in/7xK1PRp",
            recommended: false
        }
    ];

    const epsonPrinters = [
        { name: "Epson L3250", link: "https://fktr.in/b6O2XKf" },
        { name: "Epson L3260", link: "https://fktr.in/osA7zKE" },
        { name: "Epson L3256", link: "https://fktr.in/502aLH2" },
        { name: "Epson L3251", link: "https://fktr.in/xA7mYh4" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
            {/* Hero Section */}
            <header className="bg-blue-700 text-white py-12 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <Printer size={64} className="text-blue-200" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Cyber Cafe के लिए Best Printer कौन सा लें?
                    </h1>
                    <p className="text-xl text-blue-100">2026 Complete Buyers Guide</p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 mt-8">
                {/* Intro */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <p className="text-lg leading-relaxed">
                        अगर आप <span className="font-bold text-blue-600">Cyber Cafe या Jan Seva Kendra</span> खोल रहे हैं,
                        तो सबसे जरूरी मशीनों में से एक होता है <strong>Printer</strong>। सही प्रिंटर का चुनाव आपके बिजनेस
                        की सफलता में बहुत बड़ा रोल निभाता है। गलत प्रिंटर लेने पर आपका खर्च बढ़ सकता है और बार-बार
                        रिपेयर की समस्या भी आ सकती है। खासकर गांव और छोटे शहरों में काम करने वाले लोगों के लिए
                        टिकाऊ और कम खर्च वाला प्रिंटर बहुत जरूरी होता है। आपको ऐसा प्रिंटर चुनना चाहिए जो
                        कम इंक में ज्यादा प्रिंट दे और लंबे समय तक चले। साथ ही स्कैन और कॉपी की सुविधा होना
                        भी जरूरी है क्योंकि ग्राहकों को इन सेवाओं की भी जरूरत पड़ती है। आजकल ऑनलाइन सेवाओं
                        जैसे आधार, पैन कार्ड, जाति प्रमाण पत्र आदि के लिए प्रिंटिंग का काम लगातार बढ़ रहा है।
                        इसलिए एक अच्छा प्रिंटर आपकी कमाई को बढ़ा सकता है। इस आर्टिकल में हम आपको सही प्रिंटर
                        चुनने की पूरी जानकारी देंगे। ताकि आप कम बजट में बेहतर फैसला ले सकें। सही जानकारी
                        के साथ आप अपने बिजनेस को तेजी से आगे बढ़ा सकते हैं।
                    </p>
                </section>

                {/* What to look for */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800">
                        <Zap className="text-yellow-500" /> Printer लेते समय क्या ध्यान रखें?
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        सही प्रिंटर चुनना आपके बिजनेस के खर्च और प्रॉफिट दोनों को प्रभावित करता है।
                        अगर आप शुरुआत में सही फीचर्स वाला प्रिंटर लेते हैं तो बार-बार खर्च और परेशानी से बच सकते हैं।
                        नीचे दिए गए पॉइंट्स आपको एक बेहतर और स्मार्ट निर्णय लेने में मदद करेंगे।
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "Printing Cost कम हो (Low Cost Per Page)",
                            "Ink Tank वाला Printer हो",
                            "Fast Printing Speed",
                            "Scan + Print + Copy (All-in-One)",
                            "Durable (लंबे समय तक चले)"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Canon Section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                            <ShieldCheck className="text-blue-600" /> 🥇 Recommended: Canon Series
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {canonPrinters.map((printer, idx) => (
                            <div key={idx} className={`relative bg-white p-6 rounded-2xl border-2 transition-transform hover:scale-[1.02] ${printer.recommended ? 'border-blue-500' : 'border-gray-100'}`}>
                                {printer.recommended && (
                                    <span className="absolute -top-3 right-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Best Value
                                    </span>
                                )}
                                <h3 className="text-xl font-bold mb-1">{printer.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{printer.tag}</p>
                                <div className="text-2xl font-bold text-blue-600 mb-4">{printer.price}</div>

                                <ul className="space-y-3 mb-6">
                                    {printer.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                            <CheckCircle2 size={16} className="text-green-500" /> {f}
                                        </li>
                                    ))}
                                    {printer.cons.map((c, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-red-500">
                                            <div className="w-4 h-4 flex items-center justify-center bg-red-100 rounded-full text-[10px]">✕</div> {c}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={printer.link}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
                                >
                                    <ShoppingCart size={18} /> Buy Now
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Epson Section */}
                <section className="mb-12 bg-gray-100 p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">🥈 Epson Printer (Alternative Option)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {epsonPrinters.map((printer, idx) => (
                            <a
                                key={idx}
                                href={printer.link}
                                target="_blank"
                                className="flex items-center justify-between bg-white p-4 rounded-xl hover:shadow-md transition-shadow group"
                            >
                                <span className="font-semibold">{printer.name}</span>
                                <div className="flex items-center text-blue-600 text-sm font-medium">
                                    Check Price <ShoppingCart size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="mb-12 overflow-hidden border border-gray-200 rounded-2xl">
                    <div className="bg-gray-800 text-white p-4 font-bold text-center">
                        ⚖️ Canon vs Epson Comparison
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-bold">Feature</th>
                                    <th className="p-4 font-bold">Canon</th>
                                    <th className="p-4 font-bold">Epson</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="p-4 font-medium">Cost (कीमत)</td>
                                    <td className="p-4 text-green-600 font-bold">सस्ता (Budget Friendly)</td>
                                    <td className="p-4 text-orange-600">थोड़ा महंगा</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">Maintenance</td>
                                    <td className="p-4">आसान (Simple)</td>
                                    <td className="p-4">थोड़ा ज्यादा (Complex)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium">Print Quality</td>
                                    <td className="p-4">अच्छा (Good)</td>
                                    <td className="p-4 text-blue-600 font-bold">बहुत अच्छा (Crisp)</td>
                                </tr>
                                <tr className="bg-blue-50">
                                    <td className="p-4 font-bold">Our Choice</td>
                                    <td className="p-4 text-blue-700 font-bold">⭐ Best for Beginners</td>
                                    <td className="p-4">👍 Good for Professionals</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Final Suggestion */}
                <section className="bg-white text-black p-8 rounded-3xl mb-8 border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        👉 Final Suggestion
                    </h2>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        सही प्रिंटर का चुनाव आपके Cyber Cafe या Jan Seva Kendra की कमाई को सीधे प्रभावित करता है।
                        इसलिए हमेशा ऐसा प्रिंटर चुनें जो कम खर्च में ज्यादा काम करे और लंबे समय तक टिके।
                        शुरुआती स्टेज में सही निवेश करने से भविष्य में आपका खर्च काफी कम हो जाता है।
                    </p>

                    <p className="text-lg mb-6">
                        अगर आप कम खर्च और ज्यादा काम चाहते हैं, तो
                        <span className="font-bold underline decoration-orange-500"> Canon G2012 या G3012</span>
                        सबसे बेस्ट ऑप्शन है। यह रफ और टफ काम के लिए बना है।
                    </p>

                    <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-xl border border-gray-200">
                        <Info className="text-gray-600 shrink-0" size={24} />
                        <p className="text-sm italic text-gray-700">
                            <strong>Disclaimer:</strong> यह आर्टिकल केवल जानकारी के उद्देश्य से बनाया गया है।
                            प्रोडक्ट की कीमत और उपलब्धता समय के अनुसार बदल सकती है।
                        </p>
                    </div>
                </section>
            </main>


        </div>
    );
};

export default PrinterGuide;