var CACHE_NAME = 'pages1';
var filesToCache = [
  '/',
  '/login.html',
  '/Registration.html',
  '/landingPage.html',
  '/css/bootstrap.css',
  '/css/style.css',
  
  '/image/img1.jpg',
  '/image/img2.jpg',
  '/image/notication.png',
  '/image/check.png',
  '/image/cross.png',
  '/js/app.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


//self.addEventListener('activate', function(e) {
//  console.log('[ServiceWorker] Activate');
//    
//  e.waitUntil(
//    caches.keys().then(function(keyList) {
//      return Promise.all(keyList.map(function(key) {
//        if (key !== cacheName) {
//          console.log('[ServiceWorker] Removing old cache', key);
//          return caches.delete(key);
//        }
//      }));
//    })
//  );
//       
//  return self.clients.claim();
//});


//self.addEventListener('fetch', function(e) {
//  /*console.log('[ServiceWorker] Fetch', e.request.url);*/
//  e.respondWith(
//    caches.match(e.request).then(function(response) {
//        
////        var fetchPromise=fetch(e.request).then(function(networkResponse){
////            if(networkResponse){
////                cache.put(e.request,networkResponse.clone());
////            }
////            return networkResponse;
////        },function(e){
////            
////        });
//      return response || fetch(e.request);
//    })
//  );
//});


self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
            //console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                
                if (networkResponse) {
                   
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                
                
            });

            // respond from the cache, or the network
            return response || fetchPromise;
        });
    }));
});
self.addEventListener('notificationclick',function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var a = e.action;
  if(a === 'close'){
	  notification.close();
  }else{
	  clients.openWindow('http://www.google.com');
	  notification.close();
  }

  //console.log("Notification Clicked right now "+a);
});

self.addEventListener('notificationclose',function(e) {
  var n = e.notification;
  var p = n.data.primaryKey;
  console.log('Lovely Notification Closed '+p);
});