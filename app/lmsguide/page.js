import React from 'react';
import { 
  Key, 
  User, 
  ShieldCheck, 
  LogIn, 
  HelpCircle, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  RefreshCcw,
  ArrowRight,
  ListChecks,
  Lock,
  Smartphone,
  Check
} from 'lucide-react';

export default function LMSGuide() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* --- Sticky Header --- */}
      <header className="bg-white border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="text-violet-600 w-6 h-6" />
            <span className="font-black text-lg">LMS ID Password Guide</span>
          </div>
          <div className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            TEC Portal Access
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* --- Hero Section --- */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-slate-900">
            LMS ID Password <span className="text-violet-600 underline decoration-indigo-200">कैसे लें</span> – Full Guide
          </h1>
          
          <div className="bg-violet-600 text-white p-8 rounded-[2.5rem] shadow-xl mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck size={120} /></div>
            <p className="text-lg font-medium leading-relaxed relative z-10 italic">
              "LMS ID और Password TEC (Telecentre Entrepreneur Course) portal में login करने के लिए जरूरी होते हैं। इस guide में जानें registration के बाद LMS ID कैसे मिलता है, password कैसे बनाएं और login कैसे करें – पूरी जानकारी आसान भाषा में।"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-700">
                 🚀 LMS ID क्या होता है?
               </h2>
               <p className="text-sm font-medium text-slate-600 mb-4">LMS (Learning Management System) ID एक login ID होता है जिससे आप TEC course portal में login करते हैं।</p>
               <ul className="space-y-2 text-xs font-bold text-slate-500">
                 <li className="flex items-center gap-2"><Check size={14} className="text-violet-500"/> Course modules देख सकते हैं</li>
                 <li className="flex items-center gap-2"><Check size={14} className="text-violet-500"/> Tests दे सकते हैं</li>
                 <li className="flex items-center gap-2"><Check size={14} className="text-violet-500"/> Certificate download कर सकते हैं</li>
               </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-700">
                 🔑 LMS Password क्या है?
               </h2>
               <p className="text-sm font-medium text-slate-600 mb-4">Password वह secret key है जिससे आप अपनी LMS ID को सुरक्षित रखते हैं।</p>
               <div className="bg-violet-50 p-3 rounded-xl border border-violet-100 flex items-center gap-2 text-sm font-black text-violet-800">
                 <Lock size={16}/> ID + Password = Dashboard Access
               </div>
            </div>
          </div>
        </section>

        {/* --- Step-by-Step Guide --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
            <ListChecks className="text-violet-600" /> 🧾 LMS ID Password कैसे लें (Step-by-Step)
          </h2>
          
          <div className="space-y-6">
            {[
              { title: "TEC Registration करें", desc: "TEC portal पर जाकर अपना नाम, मोबाइल और Email के साथ New Registration करें।" },
              { title: "Fees Payment करें", desc: "₹1479 (approx) online pay करें। इसके बिना account activate नहीं होता।" },
              { title: "LMS ID प्राप्त करें", desc: "Payment के बाद LMS ID screen पर दिखेगा या Email/SMS में आएगा।" },
              { title: "Password सेट करें", desc: "Registration के समय बनाएं या 'Forgot Password' से नया सेट करें।" },
              { title: "Login करें", desc: "Portal पर जाकर ID और Password डालें, आपका Dashboard खुल जाएगा।" }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                   <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-black text-sm z-10 flex-shrink-0">
                     {idx + 1}
                   </div>
                   {idx < 4 && <div className="w-0.5 h-full bg-slate-200 -mt-1"></div>}
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm w-full mb-4">
                  <h3 className="font-black text-slate-800 mb-1">🔹 Step {idx + 1}: {step.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Forgot Password Section --- */}
        <section className="mb-12 bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 relative">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2">
            <RefreshCcw className="text-indigo-600" /> 🔄 अगर ID या Password भूल जाएं?
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
               <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold text-xs">STEP 1</span>
               <p className="text-sm font-bold">“Forgot Password” पर क्लिक करें</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
               <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold text-xs">STEP 2</span>
               <p className="text-sm font-bold flex items-center gap-2"><Smartphone size={14}/> Registered mobile/email डालें</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
               <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold text-xs">STEP 3</span>
               <p className="text-sm font-bold">OTP verify करके नया password सेट करें</p>
            </div>
          </div>
        </section>

        {/* --- Troubleshooting Section --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-rose-700">
            <AlertTriangle className="text-rose-500" /> ⚠️ Common Problems & Solution
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { prob: "LMS ID नहीं मिला?", sol: "Email/SMS और Spam folder check करें।" },
              { prob: "Login नहीं हो रहा?", sol: "Caps Lock check करें और सही ID डालें।" },
              { prob: "Password भूल गए?", sol: "Forgot Password option से reset करें।" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border-2 border-rose-50 shadow-sm">
                <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-2">Problem</p>
                <h4 className="font-bold text-slate-800 mb-4">❌ {item.prob}</h4>
                <div className="pt-4 border-t border-slate-50">
                   <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">Solution</p>
                   <p className="text-sm font-medium text-slate-500">✔ {item.sol}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Tips & Importance --- */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
           <div className="bg-amber-50 border-2 border-dashed border-amber-300 p-6 rounded-[2.5rem]">
              <h3 className="font-black text-amber-900 mb-4 flex items-center gap-2 text-lg">
                <Lightbulb className="text-amber-500 fill-amber-200" /> 🔑 Important Tips
              </h3>
              <ul className="space-y-3 text-sm font-bold text-amber-800">
                <li className="flex gap-2">✔️ <span>LMS ID सुरक्षित रखें</span></li>
                <li className="flex gap-2">✔️ <span>Password शेयर न करें</span></li>
                <li className="flex gap-2">✔️ <span>Login details कहीं लिखकर रखें</span></li>
              </ul>
           </div>

           <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl">
              <h3 className="font-black text-violet-400 mb-4 flex items-center gap-2 text-lg">
                <HelpCircle size={18} /> LMS ID क्यों जरूरी है?
              </h3>
              <div className="space-y-3 text-sm font-bold">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                   <ArrowRight size={14} className="text-violet-400" /> TEC course access करने के लिए
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                   <ArrowRight size={14} className="text-violet-400" /> Final Exam देने के लिए
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                   <ArrowRight size={14} className="text-violet-400" /> Certificate download करने के लिए
                </div>
              </div>
           </div>
        </section>

        {/* --- Summary & CTA --- */}
        <footer className="mt-20">
           <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm text-center">
             <h2 className="text-2xl font-black mb-6 underline decoration-violet-200 underline-offset-8">
               📌 Quick Summary
             </h2>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-left">
                {["LMS ID = Username", "Password = Key", "Set after Reg.", "Can be Reset"].map((txt, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                    <CheckCircle2 className="text-violet-500" size={14}/> {txt}
                  </div>
                ))}
             </div>

             <div className="bg-violet-600 text-white px-8 py-5 rounded-full font-black text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-3 mx-auto max-w-sm group">
               अभी Register करें <LogIn className="group-hover:translate-x-1 transition-transform" />
             </div>
             <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">TEC portal Dashboard Access Guide</p>
           </div>
        </footer>

      </main>
    </div>
  );
}