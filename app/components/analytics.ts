function getDevice(): string {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) return "Android";
  if (/Mac/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows";
  return "Desktop";
}

function getSid(): string {
  const key = "cita_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export function trackEvent(event: string, extra?: Record<string, unknown>) {
  const payload = {
    event,
    device: getDevice(),
    sid: getSid(),
    ts: new Date().toISOString(),
    ...extra,
  };
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}
