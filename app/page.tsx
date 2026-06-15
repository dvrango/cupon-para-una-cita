"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { trackEvent } from "./components/analytics";
import CouponScene from "./components/scenes/CouponScene";
import AcceptScene from "./components/scenes/AcceptScene";
import RejectScene from "./components/scenes/RejectScene";

type Scene = "coupon" | "accept" | "reject";

export default function Home() {
  const [scene, setScene] = useState<Scene>("coupon");

  useEffect(() => {
    const key = "cita_visited";
    const isReturn = !!localStorage.getItem(key);
    localStorage.setItem(key, "1");
    trackEvent("pagina_abierta", { is_return: isReturn });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {scene === "coupon" && (
        <CouponScene
          key="coupon"
          onAccept={() => setScene("accept")}
          onReject={() => setScene("reject")}
        />
      )}
      {scene === "accept" && <AcceptScene key="accept" />}
      {scene === "reject" && <RejectScene key="reject" onCancel={() => setScene("coupon")} />}
    </AnimatePresence>
  );
}
