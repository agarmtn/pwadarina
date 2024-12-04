//Asignar nombre y version de la cacje
const CACHE_NAME = 'v1_cache_DarinaLaraModesto';

//Ficheros a cachear en la aplicacion
var urlsToCache = [
   './',
    './styles.css',
    './img/video1.mp4',
    './img/video2.mp4',
    './img/video3.mp4',
    './img/1.jpeg',
    './img/2.jpg',
    './img/3.jpg',
    './img/facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './img/instagram.png',
    './img/twitter.png',
];

//Evento activate
//Instalacion del service Worker y guarda en cache los recursos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });

        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});
//Que la app funcione sin conexion

//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});
