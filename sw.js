/* Este archivo debe estar
 * colocado en la carpeta raíz del
 * sitio.
 * 
 * Cualquier cambio en el
 * contenido de este archivo hace
 * que el service worker se
 * reinstale.
 * 
 * Normalmente se cambia el número
 * en el nombre del caché cuando
 * cambia el contenido de los
 * archivos.
 * 
 * Cuando uses GitHub Pages espera
 * 11 minutos después de hacer los
 * cambios en tu sitio, para
 * depués actualizar este archivo.
 */
const CACHE = "dmppwa-2.03";

/** Archivos requeridos para que
 * la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
  "ayuda.html",
  "favicon.ico",
  "index.html",
  "LICENSE",
  "site.webmanifest",
  "css/colores.css",
  "css/estilos.css",
  "img/icono1024.png",
  "img/icono2048.png",
  "img/icono256.png",
  "js/config.js",
  "js/CtrlDivide.js",
  "js/regSw.js",
  "lib/campo-dinamico.js",
  "lib/campos.css",
  "lib/icono.css",
  "lib/material-icons.css",
  "lib/MaterialIcons-Regular.codepoints",
  "lib/MaterialIcons-Regular.ttf",
  "lib/mi-nav.css",
  "lib/movil.js",
  "lib/principal.css",
  "lib/roboto-v20-latin-700.woff",
  "lib/roboto-v20-latin-700.woff2",
  "lib/roboto-v20-latin-regular.woff",
  "lib/roboto-v20-latin-regular.woff2",
  "lib/roboto.css",
  "lib/fabrica.js",
  "lib/tiposFire.js",
  "lib/util.js",
  "js/CtrlHistorial.js",
  "js/CtrlMovil.js",
  "js/init.js",
  "js/tipos.js",
  "disp/CtrlDispositivo.js",
  "disp/ProxyEntrada.js",
  "disp/ProxyHistorial.js",
  "dis/ProxySalida.js",
  "dis/ResInt.js",
  "dis/utilIoT.js",
  "cmp/mi-footer.js",
  ".vscode/settings.json"
  
  
  
  
  "/"
];

self.addEventListener("install",
  evt => {
    console.log("sw instalado.");
    /* Realiza la instalación.
     * Carga los archivos
     * requeridos en la caché. */
    // @ts-ignore
    evt.waitUntil(cargaCache());
  });

/* Toma los archivos solicitados
 * de la caché; si no los
 * encuentra, se descargan. */
self.addEventListener("fetch",
  evt => {
    // @ts-ignore
    if (evt.request.method ===
      "GET") {
      // @ts-ignore
      evt.respondWith(
        usaCache(evt));
    }
  });

self.addEventListener("activate",
  () =>
    console.log("sw activo."));

async function cargaCache() {
  console.log(
    "Intentando cargar cache",
    CACHE);
  const cache =
    await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache", CACHE,
    "cargado");
}

async function usaCache(evt) {
  const cache =
    await caches.open(CACHE);
  const response =
    await cache.match(evt.request,
      { ignoreSearch: true });
  if (response) {
    return response;
  } else {
    return fetch(evt.request);
  }
}
