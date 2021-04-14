
//asignar un nombre y versión al cache
const CACHE_NAME = 'angelpereziot-b1ce02',
  urlsToCache = [
    "ayuda.html",
    "script.js",
    "historial.html",
  "dispositivo.html",
  ".vscode/settings.json",
  "favicon.ico",
  "index.html",
  "LICENSE",
  "site.webmanifest",
  "cmp/mi-footer.js",
  "css/colores.css",
  "css/estilos.css",
  "img/icono1024.png",
  "img/icono2048.png",
  "img/icono256.png",
  "disp/ProxyEntrada.js",
   "disp/CtrlDispositivo.js",
   "disp/ProxyHistorial.js",
   "disp/ProxySalida.js",
   "disp/ResInt.js ",
   "disp/utilIoT.js ",
  "js/config.js",
  "js/CtrlDivide.js",
  "js/regSw.js",
   "js/init.js",
   "js/CtrlMovil.js ",
   "js/CtrlHistorial.js",
   "js/tipos.js ",
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
   "lib/util.js",
   "lib/tiposFire.js ",
   "lib/fabrica.js ",
  "/"
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})


