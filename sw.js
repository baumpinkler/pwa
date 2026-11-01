/* Service Worker: macht die App offline-fähig.
   Strategie: Antwort sofort aus dem Speicher, im Hintergrund aktualisieren.
   Nach einem Upload neuer Dateien sieht man die Änderungen beim übernächsten Öffnen.
   Wer eine Änderung sofort erzwingen will, erhöht die VERSION.
   Wichtig: GitHub Pages lässt Dateien 10 Minuten im Browser-Zwischenspeicher liegen.
   Deshalb wird hier immer mit cache:"reload" bzw. "no-cache" geladen, sonst landen alte Dateien im neuen Cache.

   Zwei Caches:
   - fach-vokabeln-<VERSION>: App-Dateien (CORE inkl. modules/index.json), wird bei jeder neuen VERSION ersetzt.
   - fach-vokabeln-daten: alles unter modules/ außer index.json, also nur die gewählten Module (je eine module.json).
     Wird nie automatisch gelöscht, damit gewählte Module ein App-Update offline überstehen.
     Beim Entfernen eines Moduls löscht die App dessen Einträge selbst (Cache-API). */
const VERSION = "v46";
const PREFIX = "fach-vokabeln-";
const CACHE = PREFIX + VERSION;
const DATA = PREFIX + "daten";
const CORE = [
  "./", "index.html", "style.css", "app.js", "manifest.json",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png",
  "modules/index.json"
];
const BASE = new URL("./", self.location).href;
const MODULES_BASE = BASE + "modules/";
const INDEX_URL = BASE + "modules/index.json";

/* Beim Installieren nur die App selbst laden, keine Module: die lädt die App erst, wenn sie gewählt sind */
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE.map(u => new Request(u, {cache: "reload"})));
    await self.skipWaiting();
  })());
});

/* Nur alte App-Caches löschen, nie den Daten-Cache */
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith(PREFIX) && key !== CACHE && key !== DATA) await caches.delete(key);
    /* Seit v16: keine Zusatzdateien mehr (stecken in module.json), Modul ftth entfernt → Reste aus dem Daten-Cache räumen */
    try {
      const data = await caches.open(DATA);
      for (const r of await data.keys()) if (r.url.includes("/extra/") || r.url.startsWith(MODULES_BASE + "ftth/")) await data.delete(r);
    } catch (e) {}
    await self.clients.claim();
  })());
});

/* Moduldateien landen beim ersten Abruf im Daten-Cache. Fehlende Dateien (404) landen nicht im Cache. */
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;
  const clean = url.origin + url.pathname;
  const isData = sameOrigin && clean.startsWith(MODULES_BASE) && clean !== INDEX_URL;
  event.respondWith((async () => {
    const cache = await caches.open(isData ? DATA : CACHE);
    const cached = await cache.match(req, {ignoreSearch: sameOrigin});
    const network = fetch(req, sameOrigin ? {cache: "no-cache"} : undefined).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { event.waitUntil(network); return cached; }
    const res = await network;
    if (res) return res;
    if (req.mode === "navigate") return (await (await caches.open(CACHE)).match("index.html")) || Response.error();
    return Response.error();
  })());
});
