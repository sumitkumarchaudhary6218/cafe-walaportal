"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
    { id: "all", label: "All Tools", icon: "🗂️" },
    { id: "document", label: "Document Tools", icon: "📄" },
    { id: "converter", label: "Converters", icon: "🔄" },
    { id: "calculator", label: "Calculators", icon: "🧮" },
    { id: "utility", label: "Utilities", icon: "🛠️" },
    { id: "csc", label: "CSC Vle Tools", icon: "🔒" },
];

const topFilters = [
    { id: "all", label: "All Tools" },
    { id: "document", label: "Document Tools" },
    { id: "converter", label: "Converters" },
    { id: "calculator", label: "Calculators" },
    { id: "utility", label: "Utilities" },
];

const tools = [
    {
        id: 1,
        title: "Multiple ID Cards Print",
        description: "Create and print multiple ID cards on a single A4 page. Supports Aadhaar, PAN, and other cards with easy layout adjustment and PDF download.",
        category: "document",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        emoji: "📋",
        badge: null,
        url: "/cardprinttool"
    },
    {
        id: 2,
        title: "PAN Card Tool",
        description: "Edit, resize, and print PAN cards with proper dimensions. Ideal for quick printing and layout adjustments.",
        category: "document",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        emoji: "🪪",
        badge: "New",
        url: "/pancard"
    },
    {
        id: 3,
        title: "Typing Test",
        description: "Improve your typing speed and accuracy with real-time tests. Track WPM, accuracy, and practice with different text levels.",
        category: "Typing Test",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        emoji: "⌨️",
        badge: null,
        url: "/typingtest"
    },
    {
        id: 4,
        title: "Image Compressor",
        description: "Compress and reduce image size without losing quality. Supports fast processing for JPG, PNG, and more.",
        category: "tools",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        emoji: "🖼️",
        badge: "Popular",
        url: "/imageCompressor"
    },
    {
        id: 9,
        title: "PDF Compressor",
        description: "Reduce PDF file size without losing quality. Ideal for uploading and sharing.",
        category: "tools",
        bg: "from-indigo-50 to-blue-100",
        accent: "#4F46E5",
        emoji: "📉",
        badge: "Popular",
        url: "/kbpdfresizer"
    },
    {
        id: 6,
        title: "PDF to JPG",
        description: "Convert PDF pages into high-quality JPG images quickly. Extract images from PDF files for easy use, sharing, or editing.",
        category: "tools",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        emoji: "📄",
        badge: "New",
        url: "/fileconverter"
    }
];
export default function ToolsCollection() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [activeSidebar, setActiveSidebar] = useState("all");

    const activeCategory = activeSidebar !== "all" ? activeSidebar : activeFilter;

    const filteredTools =
        activeCategory === "all"
            ? tools
            : tools.filter((t) => t.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#F4F6F9] font-sans">
            {/* Header */}
            <div className="pt-12 pb-6 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Our Tools Collection
                </h1>
                <p className="mt-2 text-gray-500 text-sm md:text-base">
                    CSC VLE के लिए 100% Free &amp; Useful Smart Tools.
                </p>
            </div>

            {/* Top Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 px-4 mb-8">
                {topFilters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => {
                            setActiveFilter(f.id);
                            setActiveSidebar("all");
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer
              ${activeFilter === f.id && activeSidebar === "all"
                                ? "bg-[#C0193A] text-white border-[#C0193A] shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#C0193A] hover:text-[#C0193A]"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pb-16 flex flex-col md:flex-row gap-6">
                {/* Sidebar */}


                {/* Tools Grid */}
                <main className="flex-1">
                    {filteredTools.length === 0 ? (
                        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                            No tools found in this category.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

function ToolCard({ tool }) {
    const router = useRouter();

    const urouthendel = (url) => {
        if (url) {
            router.push(url); // Next.js routing
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 hover:border-[#C0193A]">

            {/* Card Image Area */}
            <div
                className={`relative h-40 bg-gradient-to-br ${tool.bg} flex items-center justify-center`}
            >
                <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
                    {tool.emoji}
                </span>

                {tool.badge && (
                    <span
                        className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: tool.accent }}
                    >
                        {tool.badge}
                    </span>
                )}
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1">
                    {tool.title}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed flex-1">
                    {tool.description}
                </p>

                <button
                    onClick={() => urouthendel(tool?.url)}
                    className="mt-4 w-full py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: "#C0193A" }}
                >
                    Open Tool
                </button>
            </div>
        </div>
    );
}