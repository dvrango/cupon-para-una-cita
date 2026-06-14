"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { DATE_DISPLAY, TIME_DISPLAY } from "../config";
import { trackEvent } from "../analytics";

interface Props {
  onAccept: () => void;
  onReject: () => void;
}

export default function CouponScene({ onAccept, onReject }: Props) {
  useEffect(() => {
    trackEvent("cupon_visto");
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh paper-bg px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: "var(--ink-soft)" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Tienes correo
      </motion.p>

      {/* Coupon card */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        {/* Top tear line */}
        <div className="flex items-center gap-1 mb-0">
          <div className="w-4 h-4 rounded-full" style={{ background: "var(--paper)", border: "2px dashed #c9a87a", flexShrink: 0 }} />
          <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "#c9a87a" }} />
          <div className="w-4 h-4 rounded-full" style={{ background: "var(--paper)", border: "2px dashed #c9a87a", flexShrink: 0 }} />
        </div>

        {/* Main coupon body */}
        <div
          className="px-7 py-8"
          style={{
            background: "#fffdf9",
            border: "2px dashed #c9a87a",
            borderTop: "none",
            borderBottom: "none",
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>
              Cupón válido
            </p>
            <h1 className="font-serif text-4xl font-semibold" style={{ color: "var(--ink)" }}>
              Una Cita
            </h1>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed mb-6" style={{ borderColor: "#ddd0be" }} />

          {/* Details */}
          <div className="space-y-3 text-sm" style={{ color: "var(--ink-soft)" }}>
            <div className="flex justify-between">
              <span className="uppercase text-xs tracking-wider">Para</span>
              <span className="font-serif italic text-base" style={{ color: "var(--ink)" }}>Ruth</span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-xs tracking-wider">Fecha</span>
              <span style={{ color: "var(--ink)" }}>{DATE_DISPLAY}</span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-xs tracking-wider">Hora</span>
              <span style={{ color: "var(--ink)" }}>{TIME_DISPLAY}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed mt-6 mb-6" style={{ borderColor: "#ddd0be" }} />

          {/* Fine print */}
          <p className="text-center text-xs" style={{ color: "#b0a090" }}>
            No expira. No transferible con otras Ruths. Solo tuyo.
          </p>
        </div>

        {/* Bottom tear line */}
        <div className="flex items-center gap-1 mt-0">
          <div className="w-4 h-4 rounded-full" style={{ background: "var(--paper)", border: "2px dashed #c9a87a", flexShrink: 0 }} />
          <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "#c9a87a" }} />
          <div className="w-4 h-4 rounded-full" style={{ background: "var(--paper)", border: "2px dashed #c9a87a", flexShrink: 0 }} />
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex gap-4 mt-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={onAccept}
          className="flex-1 py-3 rounded-xl font-medium text-white text-sm tracking-wide"
          style={{ background: "var(--rose)" }}
        >
          Acepto 
        </button>
        <button
          onClick={onReject}
          className="flex-[0.5] py-3 rounded-xl text-sm"
          style={{
            background: "transparent",
            border: "1.5px solid #ddd0be",
            color: "var(--ink-soft)",
          }}
        >
          Ahorita no joven
        </button>
      </motion.div>
    </motion.div>
  );
}
