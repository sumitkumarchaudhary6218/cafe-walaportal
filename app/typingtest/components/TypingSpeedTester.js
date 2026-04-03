"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const ENGLISH_TEXTS = [
  "Practice makes perfect. Regular typing practice can significantly improve your speed and accuracy over time.",
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once.",
  "Technology has transformed the way we communicate, work, and interact with the world around us every single day.",
  "Learning to type quickly and accurately is an invaluable skill in today's digital and fast-paced work environment.",
];

const HINDI_TEXTS = [
  "अभ्यास से ही सफलता मिलती है। नियमित टाइपिंग अभ्यास आपकी गति और सटीकता को समय के साथ काफी बेहतर बना सकता है।",
  "हिंदी भारत की राजभाषा है और यह देश के करोड़ों लोगों द्वारा बोली और समझी जाती है।",
  "कंप्यूटर और इंटरनेट ने हमारे जीवन को बहुत आसान बना दिया है और संचार के नए द्वार खोले हैं।",
  "तेज और सटीक टाइपिंग आज के डिजिटल युग में एक बहुत ही महत्वपूर्ण और उपयोगी कौशल है।",
];

const TOTAL_TIME = 60;

export default function TypingSpeedTester() {
  const [language, setLanguage] = useState("english");
  const [currentText, setCurrentText] = useState(ENGLISH_TEXTS[0]);
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [errors, setErrors] = useState(0);
  const [soundOnError, setSoundOnError] = useState(true);
  const [charStatuses, setCharStatuses] = useState([]);

  // --- New States for Custom Text ---
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [userCustomText, setUserCustomText] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  const timerRef = useRef(null);
  const textareaRef = useRef(null);
  const audioCtxRef = useRef(null);

  const getRandomText = useCallback((lang) => {
    const texts = lang === "english" ? ENGLISH_TEXTS : HINDI_TEXTS;
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  const playErrorSound = useCallback(() => {
    if (!soundOnError) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }, [soundOnError]);

  const calculateStats = useCallback(
    (input, text, elapsed) => {
      const typedChars = input.length;
      let errorCount = 0;
      const statuses = text.split("").map((char, i) => {
        if (i >= typedChars) return "pending";
        if (input[i] === char) return "correct";
        errorCount++;
        return "incorrect";
      });
      setCharStatuses(statuses);
      setErrors(errorCount);
      const correctChars = typedChars - errorCount;
      const words = correctChars / 5;
      const minutes = elapsed / 60;
      const currentWpm = minutes > 0 ? Math.round(words / minutes) : 0;
      const acc = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;
      setWpm(currentWpm);
      setAccuracy(acc);
      return errorCount;
    },
    []
  );

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsFinished(false);
    setTimeout(() => textareaRef.current?.focus(), 10);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setInputValue("");
    setTimeLeft(TOTAL_TIME);
    setWpm(0);
    setAccuracy(0);
    setErrors(0);
    setCharStatuses([]);
    
    // If user is in custom mode, keep their custom text, else get random
    if (!isCustomMode) {
      setCurrentText(getRandomText(language));
    }
  };

  const applyCustomText = () => {
    if (userCustomText.trim().length < 5) {
      alert("Please enter a longer text to practice.");
      return;
    }
    setIsCustomMode(true);
    setCurrentText(userCustomText.trim());
    setShowCustomInput(false);
    handleReset();
  };

  const handleInput = (e) => {
    if (!isRunning || isFinished) return;
    const val = e.target.value;
    const prevLen = inputValue.length;
    const newLen = val.length;
    const elapsed = TOTAL_TIME - timeLeft;
    
    calculateStats(val, currentText, elapsed > 0 ? elapsed : 1);
    
    if (newLen > prevLen) {
      const lastChar = val[newLen - 1];
      const expected = currentText[newLen - 1];
      if (lastChar !== expected) playErrorSound();
    }
    
    setInputValue(val);
    
    if (val.length >= currentText.length) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      setIsFinished(true);
    }
  };

  const handleLanguageSwitch = (lang) => {
    setLanguage(lang);
    setIsCustomMode(false); // Reset custom mode when switching languages
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setInputValue("");
    setTimeLeft(TOTAL_TIME);
    setWpm(0);
    setAccuracy(0);
    setErrors(0);
    setCharStatuses([]);
    setCurrentText(getRandomText(lang));
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const timerPercent = (timeLeft / TOTAL_TIME) * 100;
  const timerColor =
    timeLeft > 30 ? "#22c55e" : timeLeft > 10 ? "#f59e0b" : "#ef4444";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-6 text-center shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Multilingual Typing Speed Tester
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            {isCustomMode ? "Mode: Custom Text" : `Mode: Predefined ${language}`}
          </p>
        </div>

        {/* Body */}
        <div className="bg-white rounded-b-2xl shadow-xl px-4 sm:px-6 py-6 space-y-5">
          
          {/* Controls: Language and Custom Toggle */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleLanguageSwitch("english")}
              className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all border-2 ${
                language === "english" && !isCustomMode
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageSwitch("hindi")}
              className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all border-2 ${
                language === "hindi" && !isCustomMode
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all border-2 ${
                isCustomMode
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-600 border-dashed border-gray-400 hover:border-purple-400"
              }`}
            >
              ⌨️ {isCustomMode ? "Change Custom Text" : "Use My Own Text"}
            </button>
          </div>

          {/* Custom Text Input Area */}
          {showCustomInput && (
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 animate-in fade-in zoom-in duration-200">
              <label className="block text-sm font-bold text-purple-700 mb-2">Paste your custom text below:</label>
              <textarea
                className="w-full p-3 border-2 border-purple-200 rounded-lg text-sm focus:border-purple-500 outline-none"
                rows={3}
                placeholder="Type or paste the text you want to practice..."
                value={userCustomText}
                onChange={(e) => setUserCustomText(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button 
                   onClick={() => setShowCustomInput(false)}
                   className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                >Cancel</button>
                <button 
                  onClick={applyCustomText}
                  className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700"
                >
                  Apply Text
                </button>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl py-3 px-1 bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Time</span>
              <div className="relative flex items-center justify-center w-10 h-10">
                <svg className="absolute" width="40" height="40" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke={timerColor}
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - timerPercent / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
                  />
                </svg>
                <span className="relative text-sm font-bold" style={{ color: timerColor }}>{timeLeft}s</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl py-3 px-1 bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">WPM</span>
              <span className="text-xl font-bold text-green-500">{wpm}</span>
            </div>
            <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl py-3 px-1 bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Accuracy</span>
              <span className="text-xl font-bold text-purple-500">{accuracy}%</span>
            </div>
            <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl py-3 px-1 bg-gray-50">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Errors</span>
              <span className="text-xl font-bold text-red-500">{errors}</span>
            </div>
          </div>

          {/* Text Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 min-h-[100px] leading-relaxed text-base sm:text-lg font-mono select-none overflow-y-auto max-h-48">
            {currentText.split("").map((char, i) => {
              const status = charStatuses[i];
              let cls = "text-gray-400";
              if (status === "correct") cls = "text-gray-900";
              if (status === "incorrect") cls = "bg-red-200 text-red-700 rounded";
              const isCursor = i === inputValue.length && isRunning;
              return (
                <span key={i} className={`${cls} ${isCursor ? "border-l-2 border-blue-500 animate-pulse" : ""}`}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Input Textarea */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInput}
              disabled={!isRunning || isFinished}
              placeholder={isRunning ? "Keep typing..." : "Click 'Start Test' to begin"}
              rows={3}
              className={`w-full resize-none border-2 rounded-xl px-4 py-3 text-base font-mono outline-none transition-all duration-200
                ${isRunning ? "border-blue-400 focus:border-blue-600 bg-white" : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"}
              `}
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          {/* Finished Banner */}
          {isFinished && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
              <p className="text-green-700 font-bold">
                🎉 Test Finished! {wpm} WPM | {accuracy}% Accuracy
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow
                  ${isRunning ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white active:scale-95"}`}
              >
                ▶ Start Test
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gray-600 hover:bg-gray-700 text-white transition-all shadow active:scale-95"
              >
                ↺ Reset
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
              <input
                type="checkbox"
                checked={soundOnError}
                onChange={(e) => setSoundOnError(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              Beep on Error
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}