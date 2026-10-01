<div align="center">

<img src="og-image.png" alt="Creciendo Online: landing + Google Ads para emprendimientos" width="760">

# Creciendo Online

**Landing page de servicios de landings, Google Ads y automatizaciones para emprendimientos en Argentina.**

[![Sitio](https://img.shields.io/badge/sitio-creciendoonline.com.ar-0F5A44?style=flat-square)](https://creciendoonline.com.ar)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Sin dependencias](https://img.shields.io/badge/dependencias-0-0F5A44?style=flat-square)
![Netlify](https://img.shields.io/badge/deploy-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

[Ver el sitio](https://creciendoonline.com.ar) · [Portfolio](https://mariaflorenciagala.netlify.app/)

</div>

---

## Sobre el proyecto

Creciendo Online ofrece a pequeños negocios una página de ventas y una campaña de Google Ads que trabajan juntas para convertir búsquedas en consultas por WhatsApp.

El sitio está pensado como una **landing de conversión**: una sola acción principal (escribir por WhatsApp), mensajes que coinciden con los anuncios y medición de cada consulta. Está hecho con HTML, CSS y JavaScript puros, sin frameworks ni pasos de compilación, para que cargue rápido en el celular y se mantenga fácilmente.

## Funcionalidades

**Conversión**
- **Anuncio de Google en vivo:** el visitante escribe su rubro y su ciudad y ve una vista previa de cómo se vería su anuncio.
- **WhatsApp en toda la página:** cada botón abre un chat con un mensaje ya escrito según la sección desde donde se hizo clic.
- **Consulta de hosting:** el visitante elige dominio y tipo de web, recibe una recomendación y la consulta queda armada para enviar.
- **Planes con precios claros:** pago inicial, mantenimiento mensual e inversión sugerida en Google Ads para cada plan.

**Pensado para Google Ads**
- **Titular dinámico por anuncio:** `?rubro=peluquerías&zona=Rosario` adapta el titular y el ejemplo, para que la página coincida con cada grupo de anuncios.
- **Origen de cada consulta:** si la visita llega con `gclid` o parámetros `utm`, el mensaje de WhatsApp lo indica.
- **Etiqueta de Google Ads y eventos de conversión** listos para activar.

**Contenido editable**
- **Proyectos cargados desde datos:** la sección de proyectos se arma desde [`data/proyectos.js`](data/proyectos.js), con imagen, link al sitio y botón de descarga opcional para apps.

**Diseño y accesibilidad**
- **Tema claro y oscuro:** respeta la preferencia del sistema y recuerda la elección del visitante.
- **Responsive:** diseñado primero para celular.
- **Accesible:** HTML semántico, foco visible con teclado y respeto por `prefers-reduced-motion`.

**SEO**
- Meta tags, Open Graph y Twitter Cards.
- Datos estructurados (`ProfessionalService` y `FAQPage`).
- `robots.txt`, `sitemap.xml` y URL canónica.

## Tecnologías

| Área | Herramientas |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 con variables (design tokens), Grid y Flexbox |
| Interacción | JavaScript (ES6+), sin librerías |
| Tipografías | Bricolage Grotesque, Figtree e IBM Plex Mono (Google Fonts) |
| Hosting | Netlify, dominio `.com.ar` registrado en NIC Argentina |

## Estructura

```
creciendoOnline/
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos y temas claro / oscuro
├── js/
│   └── main.js          # WhatsApp, anuncio de ejemplo, hosting, tema y proyectos
├── data/
│   └── proyectos.js     # Lista de proyectos que se muestran en la página
├── assets/              # Capturas de los proyectos
├── favicon.svg
├── og-image.png         # Imagen para compartir en redes
├── robots.txt
└── sitemap.xml
```

## Cómo verlo en tu computadora

No necesita instalación. Cloná el repositorio y abrí `index.html` en el navegador:

```bash
git clone https://github.com/MariaFlorenciaGala/creciendoOnline.git
cd creciendoOnline
```

Si preferís usar un servidor local:

```bash
npx serve .
```

## Configuración

| Qué | Dónde |
|---|---|
| Número de WhatsApp | `js/main.js` → `CONFIG.whatsapp` (formato `549` + código de área + número) |
| ID de Google Ads | `index.html` → bloque `gtag.js` comentado en el `<head>` |
| Eventos de conversión | `js/main.js` → líneas `gtag('event', 'conversion', …)` |
| Colores | `css/styles.css` → variables en `:root` (claro) y en el bloque del tema oscuro |
| Proyectos | `data/proyectos.js` |

### Agregar un proyecto

```js
{
  titulo: "Nombre del proyecto",
  categoria: "Gastronomía",
  descripcion: "Una o dos oraciones sobre el proyecto.",
  imagen: "assets/mi-proyecto.jpg",          // 1200 × 750 px recomendado
  link: "https://mi-proyecto.com",           // botón "Ver sitio"
  descarga: "https://link-de-descarga",      // opcional: botón "Descargar app"
  tecnologias: ["React", "Supabase"],        // opcional
},
```

Campos opcionales: `textoLink`, `textoDescarga` y `mostrar: false` para ocultar un proyecto sin borrarlo.

## Deploy

El sitio se publica en **Netlify** desde este repositorio:

1. En Netlify: **Add new site → Import an existing project → GitHub** y elegir este repositorio. No hace falta comando de build; el directorio de publicación es la raíz.
2. En **Domain management**, agregar `creciendoonline.com.ar`.
3. En NIC Argentina, delegar el dominio a los DNS de Netlify.
4. Activar HTTPS: Netlify lo configura de forma automática y gratuita con Let's Encrypt.

Cada `git push` a `main` publica una nueva versión.

## Autora

Desarrollado por **María Florencia Gala**, desarrolladora web full-stack.

[![Portfolio](https://img.shields.io/badge/Portfolio-0F5A44?style=flat-square)](https://mariaflorenciagala.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mariflor)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/MariaFlorenciaGala)

---

<sub>© 2026 Creciendo Online. Todos los derechos reservados. El código se publica como muestra de trabajo; no se permite reutilizar la marca, los textos ni las imágenes sin autorización.</sub>
