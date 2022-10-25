"gcm_sender_id": "103953800507",


const STATIC_CACHE_NAME = 'static-file-v-7';
const DINAMIC_CACHES_NAME = 'dinamic-cache-name';
const ASSET_URLS = [
    // '/',
    // '/ru',
    // '/catalog',
    // '/wishlist',
    // '/offline.html',
    // '/favicon.ico ',
    // '/catalog?is_in_stock=true&page=1',
    // '/catalog?is_new=true&page=1',
    // '/catalog?is_bestseller=true&page=1',
    // '/catalog?is_closeout=true&page=1',
    // '/cart',
    // '/profile',
    // '/orders',
    // '/notifications',
    // '/balance',
    // '/my_reviews',
    // '/about',
    // '/news',
    // '/for_partners',
    // '/information/juridical',
    // '/information/delivery',
    // '/information/exchange',
    // '/information/payment',
    // '/information/how_to',
    // '/information/reviews',
    // '/contacts',
    // '/static/media/arrowTopNoFill.74f69abe.svg',
    // '/static/media/delivery.2ad05e5a.svg',
    // '/static/media/feedback.e4a6096f.svg',
]


self.addEventListener('install', async (event)=>{
    console.log('install');
    console.log('Установлен');
    try{

        const cache = await caches.open(STATIC_CACHE_NAME);
        await cache.addAll(ASSET_URLS);
    }catch(err){
        console.log('Error: ', err)
    }
    self.skipWaiting()
})
self.addEventListener('activate', async (event)=>{
   // чистим хранилище от старого кэша
    const cacheNames = await caches.keys();
     // подождём пока выполнится промис
     // через метод All мы передаём массив промисов и ждём пока они все выполняться
     // удаляем все кэши кроме статических
     await Promise.all(
        cacheNames
            .filter(name=>name !== STATIC_CACHE_NAME)
            .filter(name=>name !== DINAMIC_CACHES_NAME)
            .map(name=>caches.delete(name))
     )

})

self.addEventListener('fetch', async (event)=>{
    const {request} = event;
    const url = new URL(request.url);
    // if(url.origin === location.origin){
    //     // console.log('cacheFirst')
    //    // event.respondWith(cacheFirst(request));
    // }else{
        // console.log('networkFirst')
    //   event.respondWith(networkFirst(request));
    // }
})

async function cacheFirst(request){
    try{
        const cached = await caches.match(request);
        // ?? - иначе
        return cached ?? await fetch(request)
    }catch(err){console.log('Erroe: ',err)};
}

async function networkFirst(request){
    const cache = await caches.open(DINAMIC_CACHES_NAME)
    // try{
    //    // console.log('!(evt.request.url.indexOf(http) === 0)',(request.url.indexOf('http')))
    //     // if (!(request.url.indexOf('http') === 0) || !(request.url.indexOf('https') === 0) ) return;
    //     const response = await fetch(request);
    //     await cache.put(request, response.clone());
    //     return response;
    // }catch(err){
    //     const cached = await cache.match(request);
    //     const offlineHtml = await caches.match('/offline.html')
    //     return cached ?? offlineHtml
    // }


    try{ 
        const response = await fetch(request)
        // мы заносим данные в кэш которые получили с response, через метод put, клонируя данные
        if(request.method !== "POST") await cache.put(request, response.clone())
        return response
    }
    catch(err){
        // если у нас не получается получить данные с сети то получаем их с кэша
        if(request.method !== "POST"){
            const cached = await cache.match(request);
            return cached ?? await caches.match('/offline.html');
        }else{
            return await fetch(request);
        }
    }
}


// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//     apiKey: "AIzaSyDopR9XGDiqCEAGjS0ahhAHQnavcc6r4nk",
//     authDomain: "fashiontown-37c97.firebaseapp.com",
//     projectId: "fashiontown-37c97",
//     storageBucket: "fashiontown-37c97.appspot.com",
//     messagingSenderId: "41209758554",
//     appId: "1:41209758554:web:5d8e810f7a57dd59146963"
//   });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();
