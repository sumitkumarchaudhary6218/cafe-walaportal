"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AlertBanner({ show = true }) {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/toolscollection");
  };

  return (
    // overflow-hidden lagana jaruri hai taki right se aate time horizontal scrollbar na aaye
    <div className="overflow-hidden"> 
      <AnimatePresence>
        {show && (
          <motion.div
            // x: 50 matlab right se 50px door se start hoga
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-4 max-w-6xl mx-auto"
          >
            {/* Banner Container */}
            <motion.div
              onClick={handleRoute}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="my-2 cursor-pointer rounded shadow-sm"
            >
              <img
                src="/img/allsevicestools.jpeg"
                alt="PAN Update Banner"
                className="w-full object-cover"
              />
            </motion.div>

        
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}