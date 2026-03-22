export default function Header() {
  return (
    <header className="bg-red-500 py-3 px-3 md:py-4 md:px-4 border-b-2 border-yellow-400" 
    style={{
        background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 40%, #991b1b 100%)"
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 md:gap-3">
        
        <div className="text-center">
          {/* Mobile me chhota, desktop me bada */}
          <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-wide drop-shadow uppercase">
            Cyber Cafe Walo Ka Apna Portal
          </h1>

          {/* Tagline bhi mobile me chhoti */}
          <p className="text-yellow-400 text-xs sm:text-sm md:text-base font-semibold mt-1 drop-shadow">
            हम ट्रेंड नहीं बनाते, हम भरोसा बनाते हैं।
          </p>
        </div>

      </div>
    </header>
  );
}