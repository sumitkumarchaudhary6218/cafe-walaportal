"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DigitalToolsBox = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/toolscollection");
  };

  return (
    <div className="flex items-center justify-center py-10">
      
      <div className="bg-white rounded-2xl p-8 w-[1160px] shadow-lg text-center flex flex-col items-center gap-4">

        {/* Icon */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl w-12 h-12 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-indigo-950">
          Digital Tools
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
          SevaUpdates पर PAN card resize, image compressor, background remover,
          file converter और सभी cyber cafe online tools एक ही जगह पर उपलब्ध हैं।
        </p>

        {/* Button */}
        <button
          onClick={handleRoute}
          className="mt-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-[1px]"
        >
          Open Tools →
        </button>

      </div>

    </div>
  );
};

export default DigitalToolsBox;