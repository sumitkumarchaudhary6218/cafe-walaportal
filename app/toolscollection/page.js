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
        description: ".",
        category: "document",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        emoji: "📋",
        badge: null,
        url: "/cardprinttool"
    },
    // {
    //     id: 1,
    //     title: "Resume/CV Maker",
    //     description: "Create professional resumes for government job applications.",
    //     category: "document",
    //     bg: "from-blue-50 to-indigo-100",
    //     accent: "#4F46E5",
    //     emoji: "📋",
    //     badge: null,
    //     url: "/cardprinttool"
    // },
    {
        id: 2,
        title: "Marriage Bio Data Maker",
        description: "Create beautiful marriage biodata with multiple templates.",
        category: "document",
        bg: "from-orange-50 to-red-100",
        accent: "#DC2626",
        emoji: "💍",
        badge: "Popular",
        url: "/#"
    },
    {
        id: 3,
        title: "Invoice Generator",
        description: "Create professional GST invoices with logo, signature, tax & discount.",
        category: "document",
        bg: "from-purple-50 to-violet-100",
        accent: "#7C3AED",
        emoji: "🧾",
        badge: "GST",
        url: "/#"
    },
    {
        id: 4,
        title: "JPG to PDF Converter",
        description: "Convert images to PDF format for document submission.",
        category: "converter",
        bg: "from-green-50 to-emerald-100",
        accent: "#059669",
        emoji: "🖼️",
        badge: null,
        url: "/#"

    },
    {
        id: 5,
        title: "Image Resizer",
        description: "Resize photos to meet application requirements.",
        category: "utility",
        bg: "from-pink-50 to-rose-100",
        accent: "#E11D48",
        emoji: "📐",
        badge: "Free",
        url: "/#"

    },
    {
        id: 6,
        title: "Age Calculator",
        description: "Calculate your exact age for exam eligibility.",
        category: "calculator",
        bg: "from-yellow-50 to-amber-100",
        accent: "#D97706",
        emoji: "🎂",
        badge: null,
        url: "/#"

    },
    {
        id: 7,
        title: "Passport Photo Maker",
        description: "Create passport-size photos with white background in seconds.",
        category: "utility",
        bg: "from-sky-50 to-cyan-100",
        accent: "#0284C7",
        emoji: "📸",
        badge: "New",
        url: "/#"

    },
    {
        id: 8,
        title: "PDF Merger",
        description: "Merge multiple PDF files into a single document easily.",
        category: "converter",
        bg: "from-teal-50 to-green-100",
        accent: "#0D9488",
        emoji: "📎",
        badge: null,
        url: "/#"

    },
    {
        id: 9,
        title: "Word to PDF",
        description: "Convert Word documents to PDF for official submissions.",
        category: "converter",
        bg: "from-indigo-50 to-blue-100",
        accent: "#3B82F6",
        emoji: "📝",
        badge: null,
        url: "/#"

    },
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
                <aside className="w-full md:w-56 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
                        <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                            Categories
                        </h2>
                        <ul className="space-y-1">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => setActiveSidebar(cat.id)}
                                        className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                      ${activeSidebar === cat.id
                                                ? "bg-[#C0193A] text-white"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <span>{cat.icon}</span>
                                        {cat.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Box */}
                    <div className="bg-white rounded-2xl shadow-sm p-4">
                        <p className="font-bold text-gray-800 text-sm mb-1">Need Help?</p>
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                            यदि कोई टूल काम न करे या नई सुविधा चाहिए – हमसे तुरंत संपर्क करें।
                        </p>
                        <button className="w-full bg-[#C0193A] hover:bg-[#a01530] text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200 cursor-pointer">
                            Contact Us
                        </button>
                    </div>
                </aside>

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