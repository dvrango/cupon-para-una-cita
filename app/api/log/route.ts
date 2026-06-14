import { NextRequest, NextResponse } from "next/server";

const MESSAGES: Record<string, (data: Record<string, unknown>) => string> = {
  pagina_abierta: (d) => {
    const dev = d.device ? ` [${d.device}]` : "";
    const returning = d.is_return ? " (volvió a entrar)" : "";
    return `🎟️ Ruth abrió la página${returning}${dev}`;
  },
  pregunta_vista: () => "👀 Pasó a la pregunta secreta",
  respuesta_incorrecta: (d) => `❌ Respuesta incorrecta — puso: "${d.intento}"`,
  respuesta_correcta: () => "✅ Adivinó la pregunta!! Viendo el cupón...",
  cupon_visto: () => "💌 Está viendo el cupón de la cita",
  cita_aceptada: () => "🎉 ACEPTÓ LA CITA!! ♡♡♡",
  cita_rechazada: () => "💔 Rechazó la cita... arrancó la cuenta regresiva",
  cupon_destruido: () => "💥 El cupón se autodestruyó (no canceló a tiempo)",
  reconsidero: (d) => `🔄 Reconsideró!! Volvió al cupón con ${d.segundos_restantes}s de sobra 👀`,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, ...data } = body as { event: string } & Record<string, unknown>;

    const format = MESSAGES[event];
    const message = format ? format(data) : `📊 ${event}`;

    const time = new Date().toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Mexico_City",
    });

    console.log(`[${time}] ${message}`);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: `[${time}] ${message}` }),
      });
    }
  } catch {
    // ignore
  }

  return NextResponse.json({ ok: true });
}
