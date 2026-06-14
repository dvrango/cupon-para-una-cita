"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTION, isCorrectAnswer } from "../config";
import { trackEvent } from "../analytics";

interface Props {
  onCorrect: () => void;
}

export default function QuestionScene({ onCorrect }: Props) {
  const [value, setValue] = useState("");
  const [shaking, setShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    if (!value.trim()) return;

    if (isCorrectAnswer(value)) {
      trackEvent("respuesta_correcta");
      setCorrect(true);
      setTimeout(onCorrect, 1800);
    } else {
      trackEvent("respuesta_incorrecta", { intento: value });
      setAttempts((a) => a + 1);
      setShaking(true);
      setTimeout(() => setShaking(false), 420);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh paper-bg px-6 py-12"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "var(--rose-light)" }}
          >
            🔒
          </div>
        </div>

        <p className="font-serif italic text-center text-lg mb-2" style={{ color: "var(--ink)" }}>
          Primero, una pregunta de segurida, que solo tú puedes responder jaja
        </p>
        <p className="text-center text-sm mb-8" style={{ color: "var(--ink-soft)" }}>
          {QUESTION}
        </p>

        <div className={shaking ? "shake" : ""}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Tu respuesta…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors"
            style={{
              background: "#fff9f2",
              borderColor: shaking ? "var(--rose)" : "#ddd0be",
              color: "var(--ink)",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </div>

        {attempts >= 1 && (
          <motion.p
            className="text-center text-xs mt-3"
            style={{ color: "var(--rose)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={attempts}
          >
            {attempts === 1
              ? "Mmm eso no es… piénsalo bien 🤔"
              : attempts === 2
              ? "Casi… tú sabes cuál es jaja 😏"
              : attempts === 3
              ? "Nooo jaja! Piensa en algo que venderías muy bien 😂"
              : "ya casi le digo a mi ama que te ingresara para vender acuérdate jaja 😭"}
          </motion.p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 rounded-xl font-medium text-white text-sm tracking-wide transition-opacity"
          style={{ background: "var(--rose)" }}
        >
          Enviar
        </button>
      </motion.div>

      {/* Correct answer overlay */}
      <AnimatePresence>
        {correct && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            style={{ background: "rgba(250,247,242,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="text-7xl mb-6 select-none"
            >
              🔓
            </motion.div>
            <motion.p
              className="font-serif italic text-2xl mb-2"
              style={{ color: "var(--ink)" }}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ¡Respuesta correctaaaaa jaja! 🎉
            </motion.p>
            <motion.p
              className="text-sm"
              style={{ color: "var(--ink-soft)" }}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              Abriendo tu sorpresa…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
