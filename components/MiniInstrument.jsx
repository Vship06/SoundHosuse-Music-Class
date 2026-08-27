"use client";

import { motion } from "framer-motion";

export default function MiniInstrument({ instrument, isHovered }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full">
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full bg-primary/10 blur-xl z-0"
      />
      <motion.div
        initial={false}
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? -5 : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative z-10 select-none text-6xl drop-shadow-lg md:text-7xl"
      >
        {instrument.icon}
      </motion.div>
    </div>
  );
}
