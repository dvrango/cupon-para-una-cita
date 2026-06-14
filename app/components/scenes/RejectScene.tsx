"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../analytics";

interface Props {
  onCancel: () => void;
}

export default function RejectScene({ onCancel }: Props) {
  const [count, setCount] = useState(30);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    trackEvent("cita_rechazada");
  }, []);

  useEffect(() => {
    if (count <= 0) {
      setExploded(true);
      trackEvent("cupon_destruido");
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  function handleCancel() {
    trackEvent("reconsidero", { segundos_restantes: count });
    onCancel();
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh paper-bg px-6 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!exploded ? (
        <>
          <motion.div
            className="text-5xl mb-6 select-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            🧾
          </motion.div>

          <motion.p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--ink-soft)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Cupón declinado
          </motion.p>

          <motion.h1
            className="font-serif italic text-2xl mb-6"
            style={{ color: "var(--ink)" }}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Entendido. Este cupón se autodestruirá en…
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              className="font-serif text-7xl font-semibold"
              style={{ color: "var(--rose)" }}
              initial={{ scale: 1.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>

          <motion.button
            onClick={handleCancel}
            className="mt-10 px-8 py-3 rounded-full text-sm font-medium text-white"
            style={{ background: "var(--rose)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.96 }}
          >
            Espera, cambie de opinion 😅
          </motion.button>
        </>
      ) : (
        <>
          <motion.div
            className="text-7xl mb-6 select-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            💥
          </motion.div>
          <motion.h1
            className="font-serif italic text-2xl mb-3"
            style={{ color: "var(--ink)" }}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Cupón destruido
          </motion.h1>
          <motion.p
            className="text-sm"
            style={{ color: "var(--ink-soft)" }}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            …aunque si cambias de opinión, ya sabes dónde encontrarme 😏
          </motion.p>
        </>
      )}
    </motion.div>
  );
}
