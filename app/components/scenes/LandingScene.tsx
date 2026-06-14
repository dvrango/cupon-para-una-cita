"use client";

import { motion } from "framer-motion";

interface Props {
  onOpen: () => void;
}

export default function LandingScene({ onOpen }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh paper-bg px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Envelope */}
      <motion.div
        className="float mb-10 select-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
          {/* Envelope body */}
          <rect x="2" y="20" width="116" height="68" rx="6" fill="#f0e6d3" stroke="#c9a87a" strokeWidth="2" />
          {/* Flap closed */}
          <path d="M2 20 L60 58 L118 20" fill="#e8d5b7" stroke="#c9a87a" strokeWidth="2" strokeLinejoin="round" />
          {/* Wax seal */}
          <circle cx="60" cy="54" r="10" fill="#c9768a" opacity="0.9" />
          <text x="60" y="58" textAnchor="middle" fontSize="10" fill="white" fontFamily="serif">♡</text>
        </svg>
      </motion.div>

      <motion.h1
        className="font-serif text-3xl text-center mb-3"
        style={{ color: "var(--ink)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Oyee tengo algo para ti
      </motion.h1>

      <motion.p
        className="text-center text-sm mb-12"
        style={{ color: "var(--ink-soft)", maxWidth: 260 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        Hay algo esperándote adentro. Solo tú puedes abrirlo.
      </motion.p>

      <motion.button
        onClick={onOpen}
        className="px-10 py-3 rounded-full font-medium text-white text-sm tracking-wide"
        style={{ background: "var(--rose)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Abrir
      </motion.button>
    </motion.div>
  );
}
