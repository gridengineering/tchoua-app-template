/**
 * Tchoua App SDK — starter helpers (sans dépendance).
 * Le jeton est fourni par la plateforme dans l'URL : ?tchoua_token=…
 */
export function getTchouaToken() {
  return new URLSearchParams(window.location.search).get("tchoua_token");
}

export async function getTchouaContext(baseUrl = "https://www.tchoua.com") {
  const token = getTchouaToken();
  if (!token) return { ok: false, error: "NO_TOKEN" };
  const res = await fetch(`${baseUrl}/api/apps/sdk/context`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, error: data.error || `HTTP_${res.status}` };
  return { ok: true, context: data.context };
}

export function notifyTchouaReady(slug) {
  window.parent.postMessage({ type: "tchoua:ready", slug }, "*");
}

export function onTchouaContext(callback) {
  const listener = (event) => {
    if (event.data?.type === "tchoua:context" && event.data.context) callback(event.data.context);
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}
