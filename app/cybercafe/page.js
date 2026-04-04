import React from 'react';
import {
    Monitor, Printer, MapPin, CheckCircle, ShoppingCart,
    Settings, ShieldCheck, TrendingUp, Info, Tool,
    Briefcase, Landmark, Zap
} from 'lucide-react';

import { FileText } from "lucide-react";

export default function ExtendedCyberCafeGuide() {

    const Section = ({ title, icon: Icon, children }) => (
        <div className="mb-12 bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Icon size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="prose max-w-none text-gray-600 leading-relaxed">
                {children}
            </div>
        </div>
    );

    const LinkButton = ({ text }) => (
        <a href="#" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition-all border border-blue-200">
            <ShoppingCart size={18} /> {text || "Product Details देखें"}
        </a>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <header className="bg-white border-b border-gray-200 py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Business Roadmap 2026</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-4 mb-6 leading-tight">
                        Cyber Cafe कैसे खोलें 2026: <br />
                        <span className="text-blue-600">A to Z Complete Guide</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        आज के डिजिटल युग में Cyber Cafe और Jan Seva Kendra सिर्फ इंटरनेट चलाने की जगह नहीं, बल्कि डिजिटल सर्विस हब बन चुके हैं। जानिए इसे सफलतापूर्वक शुरू करने का तरीका।
                    </p>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto px-4 py-12">

                {/* --- Quick Overview --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: "Minimum Budget", val: "₹70k - ₹1L" },
                        { label: "Space Needed", val: "100-200 Sqft" },
                        { label: "License", val: "Shop Act / CSC" },
                        { label: "Monthly Profit", val: "₹30k - ₹60k" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                            <p className="text-xs text-gray-500 font-bold uppercase">{stat.label}</p>
                            <p className="text-lg font-bold text-blue-600">{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* --- Section 1: Introduction --- */}
                <Section title="1. बिजनेस का स्कोप और भविष्य" icon={TrendingUp}>
                    <p>
                        2026 तक भारत में डिजिटल लेनदेन और सरकारी सेवाओं का ऑनलाइन होना तेजी से बढ़ रहा है और आने वाले समय में यह और भी अधिक बढ़ेगा।
                        आज हर व्यक्ति को Aadhaar Update, PAN Card, राशन कार्ड, आय प्रमाण पत्र, जाति प्रमाण पत्र और अन्य सरकारी सेवाओं की आवश्यकता पड़ती है।
                        गाँव और छोटे शहरों में अभी भी लोगों को इन सेवाओं के लिए सही मार्गदर्शन नहीं मिलता है, जिससे CSC या Online Service Center की मांग लगातार बढ़ रही है।
                        यह बिजनेस कम निवेश में शुरू किया जा सकता है और इसमें कम जोखिम के साथ अच्छा मुनाफा कमाया जा सकता है।
                        डिजिटल इंडिया के तहत सरकार लगातार नई सेवाएं ऑनलाइन ला रही है, जिससे इस क्षेत्र में अवसर बढ़ते जा रहे हैं।
                        Ayushman Bharat, PM Kisan, Pension Yojana, Scholarship Form जैसी सेवाओं की डिमांड हर साल बढ़ती है।
                        लोग अपने दस्तावेज़ जैसे Aadhaar, PAN, Voter ID, Driving License आदि अपडेट कराने के लिए भरोसेमंद सेंटर ढूंढते हैं।
                        इस बिजनेस की सबसे बड़ी खासियत यह है कि यह कभी बंद नहीं होता क्योंकि सरकारी काम हमेशा चलते रहते हैं।
                        ग्रामीण क्षेत्रों में डिजिटल साक्षरता कम होने के कारण लोग पूरी तरह इन केंद्रों पर निर्भर रहते हैं।
                        आप अपने सेंटर में प्रिंटिंग, स्कैनिंग, फोटो, ऑनलाइन फॉर्म भरना जैसी सेवाएं देकर अतिरिक्त कमाई कर सकते हैं।
                        इसके अलावा बैंकिंग सेवाएं जैसे AEPS, Mini Statement, Money Transfer से भी अच्छा कमीशन मिलता है।
                        अगर आप अच्छी सर्विस देते हैं तो ग्राहक बार-बार आपके पास आएंगे और आपकी एक मजबूत पहचान बनेगी।
                        इस क्षेत्र में प्रतिस्पर्धा तो है लेकिन अच्छी सेवा और भरोसे से आप आसानी से आगे बढ़ सकते हैं।
                        आने वाले समय में हर सरकारी और प्राइवेट सेवा ऑनलाइन होने वाली है, जिससे इस बिजनेस का भविष्य और भी उज्ज्वल है।
                        आप इसे फुल टाइम या पार्ट टाइम दोनों तरीके से चला सकते हैं।
                        यह बिजनेस युवाओं के लिए रोजगार का एक बेहतरीन विकल्प बनता जा रहा है।
                        महिलाओं के लिए भी यह घर के पास शुरू करने का अच्छा अवसर है।
                        सही ट्रेनिंग और जानकारी के साथ आप इस बिजनेस में जल्दी सफलता हासिल कर सकते हैं।
                        एक बार सेटअप हो जाने के बाद यह बिजनेस लंबे समय तक स्थिर आय देता है।
                        कुल मिलाकर, यह एक ऐसा बिजनेस है जिसमें भविष्य, स्थिरता और कमाई तीनों का बेहतरीन संतुलन है।
                    </p>
                </Section>

                {/* --- Section 2: Full Budget Breakdown --- */}
                <Section title="2. खर्च और बजट (Full Breakdown)" icon={Landmark}>
                    <p className="mb-4">साइबर कैफे खोलने का खर्च आपके सेटअप पर निर्भर करता है:</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border">Item</th>
                                    <th className="p-3 border">Expected Cost</th>
                                    <th className="p-3 border">Shopping Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3 border">Computer/Laptop (Refurbished/New)</td>
                                    <td className="p-3 border">₹25,000 - ₹40,000</td>
                                    <td className="p-3 border">
                                        <a href="#" className="text-blue-600 underline" target="_blank">
                                            Buy Now
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="p-3 border">All-in-One Printer (Canon/Epson)</td>
                                    <td className="p-3 border">₹10,000 - ₹15,000</td>
                                    <td className="p-3 border">
                                        <a href="#" className="text-blue-600 underline" target="_blank">
                                            Buy Now
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="p-3 border">Furniture (Table, Chairs, Counter)</td>
                                    <td className="p-3 border">₹10,000 - ₹15,000</td>
                                    <td className="p-3 border">
                                        <a href="#" className="text-blue-600 underline" target="_blank">
                                            Buy Now
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="p-3 border">Inverter & Battery Backup</td>
                                    <td className="p-3 border">₹20,000 - ₹25,000</td>
                                    <td className="p-3 border">
                                        <a href="#" className="text-blue-600 underline" target="_blank">
                                            Buy Now
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="p-3 border">Extra (Lamination, Biometric, Web-cam)</td>
                                    <td className="p-3 border">₹5,000 - ₹8,000</td>
                                    <td className="p-3 border">
                                        <a href="#" className="text-blue-600 underline" target="_blank">
                                            Buy Now
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* --- Section 3: Hardware Deep Dive --- */}
                <Section title="3. जरूरी उपकरण और सेटअप" icon={Settings}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">💻 PC vs Laptop Selection</h3>
                            <p>अगर आपके एरिया में लाइट ज्यादा जाती है, तो <strong>Laptop</strong> बेहतर है क्योंकि इसमें बैटरी बैकअप होता है। लेकिन अगर आप लंबा और भारी काम करना चाहते हैं (जैसे फोटो एडिटिंग या लगातार फॉर्म भरना), तो <strong>Desktop PC</strong> सबसे टिकाऊ रहता है।</p>
                            <LinkButton text="Best Desktop for Cyber Cafe" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">🖨️ Printer - दफ्तर की जान</h3>
                            <p>कैफे के लिए <strong>Ink Tank Printer</strong> ही लें। Canon G2010 या Epson L-series सबसे अच्छे विकल्प हैं क्योंकि इनकी इंक की कीमत बहुत कम होती है और फोटो क्वालिटी शानदार आती है।</p>
                            <LinkButton text="Top Rated Printer Link" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">🔒 Biometric & Security</h3>
                            <p>बैंकिंग और आधार सेवाओं के लिए <strong>Mantra MFS100</strong> डिवाइस लेना न भूलें। इसके बिना आप Jan Seva Kendra का काम नहीं कर पाएंगे।</p>
                        </div>
                    </div>
                </Section>

                {/* --- Section 4: Location Strategy --- */}
                <Section title="4. सही लोकेशन का चुनाव" icon={MapPin}>
                    <p className="mb-4 font-semibold text-gray-800 underline">इन 5 जगहों पर दुकान खोलेंगे तो कमाई 2x होगी:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>तहसील / ब्लॉक कार्यालय:</strong> यहाँ आय, जाति, और निवास प्रमाण पत्र के लिए लोग हमेशा आते हैं।</li>
                        <li><strong>कॉलेज / स्कूल कैंपस:</strong> यहाँ एडमिशन फॉर्म और एग्जाम फॉर्म की भरमार रहती है।</li>
                        <li><strong>कोर्ट / कचहरी:</strong> यहाँ एफिडेविट और डॉक्यूमेंट स्कैनिंग का बहुत काम होता है।</li>
                        <li><strong>मेन मार्केट:</strong> जहाँ फुटफॉल (लोगो का आना-जाना) ज्यादा हो।</li>
                        <li><strong>रेलवे स्टेशन के पास:</strong> टिकट बुकिंग और इमरजेंसी प्रिंटआउट के लिए।</li>
                    </ul>
                </Section>
                {/* --- Section 5: Paper और Photo Printing Setup --- */}

                {/* --- Section 6: Paper और Photo Printing Setup --- */}
                <Section title="6. Paper और Photo Printing Setup" icon={FileText}>
                    <p className="mb-4 text-gray-700">
                        Cyber Cafe में printing का काम लगातार चलता रहता है, इसलिए सही quality का paper और photo paper इस्तेमाल करना बहुत जरूरी है।
                    </p>

                    <ul className="space-y-4">
                        <li>
                            <strong>👉 A4 Paper:</strong><br />
                            Brand: Century<br />
                            Price: ₹220<br />
                            <span className="text-sm text-gray-600">📌 Offline market से खरीदना ज्यादा सस्ता रहेगा</span><br />
                            <a href="#" className="text-blue-600 underline">🔗 Affiliate Link: यहाँ क्लिक करें</a>
                        </li>

                        <li>
                            <strong>👉 Photo Paper:</strong><br />
                            Brand: Prisma Jet (254 GSM)<br />
                            Price: ₹200–₹220<br />
                            <span className="text-sm text-gray-600">📌 अगर आप photo print service दे रहे हैं तो यह best quality देता है</span><br />
                            <a href="#" className="text-blue-600 underline">🔗 Affiliate Link: यहाँ क्लिक करें</a>
                        </li>
                    </ul>
                </Section>
                {/* --- Section 6: Services & Income --- */}
                <Section title="6. आप क्या-क्या सर्विस दे सकते हैं?" icon={Briefcase}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-2">सरकारी सेवाएँ (Jan Seva)</h4>
                            <ul className="text-sm space-y-1">
                                <li>• PAN Card / Voter ID Apply</li>
                                <li>• Aadhaar Address Update</li>
                                <li>• Income/Caste Certificates</li>
                                <li>• PF Withdrawal Service</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                            <h4 className="font-bold text-green-800 mb-2">डिजिटल सर्विस</h4>
                            <ul className="text-sm space-y-1">
                                <li>• Money Transfer (AEPS)</li>
                                <li>• Rail/Flight Booking</li>
                                <li>• Mobile/DTH Recharge</li>
                                <li>• Photo Printing & Lamination</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 p-6 bg-gray-900 text-white rounded-xl text-center">
                        <p className="text-gray-400 uppercase text-xs tracking-widest font-bold">Estimated Monthly Profit</p>
                        <p className="text-4xl font-black text-green-400 mt-2">₹25,000 - ₹70,000</p>
                        <p className="text-sm text-gray-400 mt-2 italic">नोट: यह कमाई आपकी लोकेशन और सर्विस की क्वालिटी पर निर्भर करती है।</p>
                    </div>
                </Section>

                {/* --- Section 7: Marketing Hacks --- */}
                <Section title="7. दुकान की मार्केटिंग कैसे करें?" icon={Zap}>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <CheckCircle className="text-blue-500 shrink-0" size={20} />
                            <span><strong>Google Maps:</strong> अपनी दुकान को गूगल मैप्स पर "Cyber Cafe Near Me" के नाम से रजिस्टर करें।</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="text-blue-500 shrink-0" size={20} />
                            <span><strong>WhatsApp Group:</strong> अपने गाँव या मोहल्ले का एक व्हाट्सएप ग्रुप बनाएं और नई सरकारी वैकेंसी के बारे में अपडेट दें।</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="text-blue-500 shrink-0" size={20} />
                            <span><strong>Banner/Poster:</strong> दुकान के बाहर एक बड़ा बोर्ड लगाएं जिस पर दी जाने वाली सभी मुख्य सेवाओं की लिस्ट हो।</span>
                        </li>
                    </ul>
                </Section>

                {/* --- Section 8: Important Warnings --- */}
                <div className="bg-red-50 border-2 border-red-100 p-8 rounded-xl mb-12">
                    <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
                        <ShieldCheck size={24} /> सावधानी और नियम (Important)
                    </div>
                    <ul className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>बिना आईडी प्रूफ देखे किसी का भी फॉर्म न भरें।</li>
                        <li>बैंकिंग ट्रांजेक्शन का एक फिजिकल रजिस्टर हमेशा मेंटेन करें।</li>
                        <li>सरकारी फीस से ज्यादा पैसे न लें, उचित कमीशन ही चार्ज करें।</li>
                        <li>अपने कंप्यूटर में एक अच्छा Antivirus (जैसे QuickHeal) जरूर रखें ताकि कस्टमर का डेटा सुरक्षित रहे।</li>
                    </ul>
                </div>

                {/* --- Footer --- */}
                <footer className="text-center py-12 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                        © 2026 Digital Business Hub. <br />
                        सभी जानकारी रिसर्च और वर्तमान मार्केट के आधार पर दी गई है। निवेश करने से पहले अपनी लोकल रिसर्च जरूर करें।
                    </p>
                </footer>

            </main>
        </div>
    );
}