import React from 'react';
import { useRouter } from 'next/navigation';

const HomepageButton = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 left-6 z-[999] group">

      {/* Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center cursor-pointer bg-[#00b84a] text-white 
        h-14 w-14 group-hover:w-44 
        rounded-full overflow-hidden
        shadow-[0_4px_15px_rgba(0,0,0,0.3)]
        transition-all duration-300 ease-in-out"
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9.75L12 3l9 6.75V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.75Z" />
            <path d="M9 22V12h6v10" />
          </svg>
        </div>

        {/* Text */}
        <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 
          transition-all duration-300 pr-4 text-lg font-semibold">
          Go To Home
        </span>
      </button>

      {/* Notification Dot */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
      </span>
    </div>
  );
};

export default HomepageButton;