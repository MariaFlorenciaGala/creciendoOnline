const CONFIG = {
  whatsapp: "5493513232653",          // formato internacional sin + ni espacios
  googleAds: {
    id: "AW-18325401950",              // ID de Google Ads (la etiqueta está en el <head> de index.html)
    conversionWhatsapp: "AW-18325401950/A92PCLOLnfEcEN7inaJE"   // conversión "Whatsapp_Click"
  }
};

/* Google Ads: cuenta cada clic a WhatsApp como conversión */
const contarConsulta = () => {
  const t = CONFIG.googleAds.conversionWhatsapp.trim();
  if (t && window.gtag) gtag("event", "conversion", { send_to: t, value: 1.0, currency: "ARS", transport_type: "beacon" });
};
/* ========================================================== */

/* Origen del visitante: detecta si llegó desde Google Ads (gclid / utm)
   y lo agrega al mensaje de WhatsApp para saber qué consultas vienen de los anuncios. */
const params = new URLSearchParams(location.search);
let origen = "";
try { origen = sessionStorage.getItem("origen") || ""; } catch (e) {}
if (params.get("gclid") || params.get("gbraid") || params.get("wbraid") || params.get("utm_source")) {
  const camp = params.get("utm_campaign");
  origen = (params.get("gclid") || params.get("gbraid") || params.get("wbraid") ? "Google Ads" : params.get("utm_source")) + (camp ? " · " + camp : "");
  try { sessionStorage.setItem("origen", origen); } catch (e) {}
}
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg + (origen ? "\n(Vengo de: " + origen + ")" : ""))}`;

/* Coincidencia con el anuncio: si la URL del anuncio trae ?rubro=peluquerias,
   el titular y el anuncio de ejemplo se adaptan a ese rubro.
   Ej.: https://creciendoonline.com.ar/?rubro=peluquerías&zona=Rosario */
const rubroParam = (params.get("rubro") || "").replace(/[<>]/g, "").trim().slice(0, 40);
const zonaParam = (params.get("zona") || "").replace(/[<>]/g, "").trim().slice(0, 30);
if (rubroParam) {
  document.getElementById("h1-kicker").textContent = `Landing + Google Ads para ${rubroParam}${zonaParam ? " en " + zonaParam : ""}`;
  const r = document.getElementById("rubro");
  if (r) r.value = rubroParam + (zonaParam ? " en " + zonaParam : "");
}

const $id = id => document.getElementById(id);
document.getElementById("yr").textContent = new Date().getFullYear();

document.querySelectorAll(".js-wa").forEach(a => {
  a.href = waLink(a.dataset.msg || "Hola Creciendo Online!");
  a.target = "_blank"; a.rel = "noopener";
  a.addEventListener("click", contarConsulta);   // cada clic en WhatsApp = 1 consulta en Google Ads
});

/* Anuncio simulado en vivo */
const input = document.getElementById("rubro");
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
function renderAd(){
  const q = input.value.trim() || "tu rubro";
  const parts = q.split(/\s+en\s+/i);
  const rubro = parts[0].trim() || "tu rubro";
  const zona = parts[1] ? parts[1].trim() : "";
  const name = "Tu " + cap(rubro).split(" ").slice(0,3).join(" ");
  document.getElementById("ad-name").textContent = name;
  document.getElementById("ad-fav").textContent = (rubro[0] || "T").toUpperCase();
  document.getElementById("ad-url").textContent = "www.tu" + (slug(rubro).slice(0,18) || "negocio") + ".com.ar";
  document.getElementById("ad-title").textContent = `${cap(rubro)}${zona ? " en " + cap(zona) : ""} | Consultá Hoy por WhatsApp`;
  document.getElementById("ad-desc").textContent = `Atención personalizada y respuesta en minutos.${zona ? " Trabajamos en " + cap(zona) + "." : ""} ¡Pedí tu presupuesto sin compromiso!`;
}
input.addEventListener("input", renderAd);
if (rubroParam) renderAd();

/* Hosting: recomendación + consulta por WhatsApp */
const REC = {
  landing:{t:"Hosting compartido básico", l:["Alcanza para una landing rápida con mucho tráfico de anuncios","Certificado HTTPS y copias de seguridad","El plan más económico, con pago mensual o anual"]},
  web:{t:"Hosting compartido con correos", l:["Espacio para una web de varias páginas","Casillas de correo con tu dominio","Panel simple para administrar todo"]},
  tienda:{t:"Hosting para tienda online o plataforma de e-commerce", l:["Más recursos para catálogo y carrito de compras","Integración con Mercado Pago","Te comparamos hosting propio contra plataformas como Tiendanube"]}
};
const TENGO = {nada:"No tengo dominio ni hosting", dominio:"Ya tengo dominio", ambos:"Ya tengo dominio y hosting"};
const hDom = document.getElementById("h-dom"), hExt = document.getElementById("h-ext"), hForm = document.getElementById("host-form");
function renderHost(){
  const clean = hDom.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9-]/g,"");
  if (clean !== hDom.value) hDom.value = clean;
  const tipo = hForm.querySelector('[name="h-tipo"]:checked').value;
  const tengo = hForm.querySelector('[name="h-tengo"]:checked').value;
  const dom = (clean || "tuemprendimiento") + hExt.value;
  const r = tengo === "ambos" ? {t:"Revisamos tu hosting actual", l:["Vemos si tu hosting aguanta el tráfico de los anuncios","Medimos la velocidad de carga en celular","Si no conviene, te pasamos opciones para mudarte"]} : REC[tipo];
  document.getElementById("h-rec").textContent = r.t;
  document.getElementById("h-list").innerHTML = r.l.map(x => `<li>${x}</li>`).join("");
  document.getElementById("h-wa").href = waLink(`Hola Creciendo Online! Quiero consultar opciones de hosting en Argentina.
• Dominio: ${dom}
• Necesito: ${hForm.querySelector('[name="h-tipo"]:checked').nextElementSibling.textContent}
• Situación: ${TENGO[tengo]}`);
}
hForm.addEventListener("input", renderHost);
hForm.addEventListener("change", renderHost);
hForm.addEventListener("submit", e => e.preventDefault());
document.getElementById("h-wa").addEventListener("click", contarConsulta);
renderHost();

/* Miniaturas: si todavía no subiste la imagen, se muestra el nombre del proyecto */
document.querySelectorAll(".work-thumb img").forEach(img => {
  const miss = () => img.parentElement.classList.add("missing");
  if (img.complete && img.naturalWidth === 0) miss();
  img.addEventListener("error", miss);
  img.addEventListener("load", () => img.parentElement.classList.remove("missing"));
});

/* Tema claro / oscuro: arranca en claro y recuerda si el visitante elige oscuro */
(() => {
  const btn = $id("theme-btn"); if (!btn) return;
  const root = document.documentElement;
  const isDark = () => root.dataset.theme === "dark";  // por defecto, tema claro
  const label = () => btn.setAttribute("aria-label", isDark() ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  label();
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("tema", next); } catch (e) {}
    label();
  });
})();

/* Proyectos: se cargan desde data/proyectos.js (editá ese archivo para cambiarlos) */
(() => {
  const box = $id("proyectos"); const list = window.PROYECTOS;
  if (!box || !Array.isArray(list)) return;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const safe = u => /^(https?:\/\/|assets\/|\.\/|\/)/i.test(String(u || "").trim()) ? String(u).trim() : "";
  const host = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; } };
  const visibles = list.filter(p => p && p.titulo && p.mostrar !== false);
  if (!visibles.length) return;
  box.innerHTML = visibles.map(p => {
    const link = safe(p.link), dl = safe(p.descarga), img = safe(p.imagen);
    const thumb = `<div class="work-thumb${img ? "" : " missing"}" data-label="${esc(p.titulo)}">${img ? `<img src="${esc(img)}" alt="Vista previa de ${esc(p.titulo)}" width="1200" height="750" loading="lazy" decoding="async">` : ""}</div>`;
    const tags = Array.isArray(p.tecnologias) && p.tecnologias.length ? `<div class="work-tags">${p.tecnologias.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : "";
    const btns = [
      link ? `<a class="work-go" href="${esc(link)}" target="_blank" rel="noopener">${esc(p.textoLink || "Ver sitio")} <svg><use href="#i-arrow"/></svg></a>` : "",
      dl ? `<a class="work-go work-dl" href="${esc(dl)}" target="_blank" rel="noopener" download>${esc(p.textoDescarga || "Descargar app")} <svg viewBox="0 0 24 24"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : ""
    ].join("");
    return `<article class="work"><div class="work-bar"><i></i><i></i><i></i><span>${esc(host(link) || p.categoria || "")}</span></div>
      ${link ? `<a class="work-thumb-link" href="${esc(link)}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${thumb}</a>` : thumb}
      <div class="work-body">${p.categoria ? `<span class="chip">${esc(p.categoria)}</span>` : ""}<h3>${esc(p.titulo)}</h3>${p.descripcion ? `<p>${esc(p.descripcion)}</p>` : ""}${tags}${btns ? `<div class="work-links">${btns}</div>` : ""}</div></article>`;
  }).join("");
  box.querySelectorAll(".work-thumb img").forEach(img => {
    const miss = () => img.parentElement.classList.add("missing");
    if (img.complete && img.naturalWidth === 0) miss();
    img.addEventListener("error", miss);
  });
})();
