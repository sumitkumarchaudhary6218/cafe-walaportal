import { FaYoutube, FaWhatsapp, FaFacebookF } from "react-icons/fa";

const socialLinks = [
 
  { 
    label: "Join Whatsapp Channel", 
    icon: <FaWhatsapp />, 
    color: "bg-green-600 hover:bg-green-700", 
    border: "border-green-700",
    href: "#"
  },
 
];

export default function Whatsapp() {
  return (
    <div className="py-4 border-gray-800">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-3">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className={`flex items-center gap-2 ${s.color} text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-md border-b-4 ${s.border} transition-transform hover:-translate-y-1`}
          >
            <span className="text-lg">
              {s.icon}
            </span>
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}