"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../analytics";

export default function AcceptScene() {
  useEffect(() => {
    trackEvent("cita_aceptada");
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh paper-bg px-6 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
    

      <motion.h1
        className="font-serif italic text-3xl mb-4"
        style={{ color: "var(--ink)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Perfecto! 
      </motion.h1>

      <motion.p
        className="text-sm leading-relaxed max-w-xs"
        style={{ color: "var(--ink-soft)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        Te aviso con los detalles, pero deja el sábado reservado 😉
      </motion.p>

      <motion.p
        className="font-serif italic text-rose-400 mt-8 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ color: "var(--rose)" }}
      >
        — Nos vemos pronto!
      </motion.p>
    </motion.div>
  );
}
