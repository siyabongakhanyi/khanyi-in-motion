// Resolve only Pinterest-owned share links for the public Pinterest Studio.
// This endpoint never fetches arbitrary hosts or returns private account data.
const MAX_REDIRECTS = 5;
const EXCLUDED_PATHS = new Set([
  "pin", "pins", "search", "ideas", "settings", "business",
  "today", "_", "login", "logout", "resource", "explore", "categories"
]);

function checkedUrl(value) {
  let url;
  try { url = new URL(value); } catch { return null; }
  const host = url.hostname.toLowerCase();
  if (
    url.protocol !== "https:" ||
    url.username || url.password || url.port ||
    !(host === "pin.it" || host === "www.pin.it" ||
      host === "pinterest.com" || host.endsWith(".pinterest.com"))
  ) return null;
  url.hash = "";
  return url;
}

function pinterestResource(url) {
  const host = url.hostname.toLowerCase();
  if (host === "pin.it" || host === "www.pin.it") return null;
  const parts = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
  if (!parts.length) return null;
  let kind;
  if (parts[0].toLowerCase() === "pin" && parts[1] && /^\d+$/.test(parts[1])) {
    kind = "pin";
  } else if (EXCLUDED_PATHS.has(parts[0].toLowerCase())) {
    return null;
  } else if (parts.length === 1) {
    kind = "profile";
  } else if (parts.length === 2) {
    kind = "board";
  } else {
    return null;
  }
  const clean = new URL("https://www.pinterest.com/" +
    parts.map(encodeURIComponent).join("/") + "/");
  return { kind, url: clean.toString() };
}

async function redirectTarget(url) {
  for (const method of ["HEAD", "GET"]) {
    const response = await fetch(url, {
      method, redirect: "manual",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KhanyiInMotion/1.0)" },
      signal: AbortSignal.timeout(3500)
    });
    // Discard an unneeded response body; no remote HTML is returned to clients.
    if (response.body) response.body.cancel().catch(() => {});
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      return location ? new URL(location, url).toString() : null;
    }
    if (method === "GET") return null;
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=3600");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "GET required." });
  }
  const input = typeof req.query.url === "string" ? req.query.url : "";
  if (input.length > 300 || !checkedUrl(input)) {
    return res.status(400).json({ error: "Use a valid Pinterest HTTPS URL." });
  }
  let current = checkedUrl(input);
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const resource = pinterestResource(current);
      if (resource) return res.status(200).json(resource);
      if (hop === MAX_REDIRECTS) break;
      const location = await redirectTarget(current.toString());
      if (!location) break;
      current = checkedUrl(location);
      if (!current) break;
    }
    return res.status(422).json({
      error: "Could not identify a public Pinterest board, Pin or profile."
    });
  } catch {
    return res.status(502).json({ error: "Pinterest could not be reached right now." });
  }
}
