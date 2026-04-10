"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const topFilters = [
    { id: "all", label: "All Tools" },
    { id: "document", label: "Document Tools" },
    { id: "tools", label: "Tools" },
];

const tools = [
    {
        id: 1,
        title: "Multiple ID Cards Print",
        description: "Create and print multiple ID cards on a single A4 page.",
        category: "document",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        icon: "/img/images_2.png",
        badge: null,
        url: "/cardprinttool"
    },
    {
        id: 2,
        title: "PAN Card Tool",
        description: "Edit, resize, and print PAN cards easily.",
        category: "document",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        icon: "/img/images_5.jpeg",
        badge: "New",
        url: "/pancard"
    },

    {
        id: 4,
        title: "Image Compressor",
        description: "Compress images without losing quality.",
        category: "tools",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        icon: "/img/images_6.jpg",
        badge: "Popular",
        url: "/imageCompressor"
    },
    {
        id: 5,
        title: "PDF Compressor",
        description: "Reduce PDF file size easily.",
        category: "tools",
        bg: "from-indigo-50 to-blue-100",
        accent: "#4F46E5",
        icon: "/img/images_7.jpeg",
        badge: "Popular",
        url: "/kbpdfresizer"
    },
    {
        id: 6,
        title: "PDF to JPG",
        description: "Convert PDF pages into JPG images.",
        category: "tools",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        icon: "/img/images_4.jpeg",
        badge: "New",
        url: "/fileconverter"
    },
    {
        id: 7,
        title: "JPG to PDF",
        description: "Convert JPG images into a single PDF file.",
        category: "tools",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        icon: "/img/images_3.jpeg",
        badge: "New",
        url: "/fileconverter"
    },
    {
        id: 7,
        title: "BG Remove Tool",
        description: "Easily remove background from your images in just one click. Fast, accurate and perfect for ID cards, product photos, thumbnails and more. No design skills required.",
        category: "tools",
        bg: "from-blue-50 to-indigo-100",
        accent: "#4F46E5",
        icon: "/img/images_3.jpeg",
        badge: "New",
        url: "/bg-remove"
    }
];

export default function ToolsCollection() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredTools =
        activeFilter === "all"
            ? tools
            : tools.filter((t) => t.category === activeFilter);

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            {/* Header */}
            <div className="pt-12 pb-6 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Our Tools Collection
                </h1>
                <p className="mt-2 text-gray-500 text-sm md:text-base">
                    CSC VLE के लिए 100% Free & Useful Smart Tools.
                </p>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {topFilters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold border transition
                        ${activeFilter === f.id
                                ? "bg-[#C0193A] text-white border-[#C0193A]"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#C0193A]"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ToolCard({ tool }) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-2xl  shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#C0193A]">

            {/* Image Area */}
            <div className="relative h-40  w-full overflow-hidden">

                <Image
                    src={tool.icon}
                    alt={tool.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Dark Overlay (for better text visibility if needed) */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Badge */}
                {tool.badge && (
                    <span
                        className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10"
                        style={{ backgroundColor: tool.accent }}
                    >
                        {tool.badge}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col">
                <h3 className="font-bold text-gray-800 mb-1">
                    {tool.title}
                </h3>

                <p className="text-gray-500 text-sm flex-1">
                    {tool.description}
                </p>

                <button
                    onClick={() => router.push(tool.url)}
                    className="mt-4 py-2 rounded-lg text-white text-sm font-semibold bg-[#C0193A] hover:opacity-90"
                >
                    Open Tool
                </button>
            </div>
        </div>
    );
}