import api from "./api/api";
import { UNREG_PUSH_v1 } from "./const";
import { setLocalStorage } from "./helpers/helpers";
//!!navigator.platform.match(/iPhone|iPod|iPad/)

// iOSiPadOS = /^iP/.test(navigator.platform) ||
// /^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4;

export async function register() {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
      console.log("publicUrl.origin !== window.location.origin", publicUrl.origin ,'!== ',  window.location.origin )
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
      // window.addEventListener('load', () => {
        const swUrl = 'sw.js';
          registerValidSW(swUrl);
      // });
    }
  }
  
  async function registerValidSW(swUrl) {
    const VAPID_PUBLIC_KEY = "BIqYIeK2W_V6W4O-i6iW0D3DLat9obm70B-PeFSjWEVwr1PeVD45N0mLPtRnhBC1Tn2AZu-fBJi-aJpwf2OCtOM"
    const VAPID_PRIVATE_KEY = "MI6i6VXcslXjGHm1dEsui3CmkOdNyGmWjspu11MyiYc"
      try{
        // const checkRegistration = await window.navigator.serviceWorker.ready;
        // console.log('checkRegistration', checkRegistration);
        // if (checkRegistrarion) return;
        const registration = await navigator.serviceWorker.register(swUrl);
        // console.log('регистрация service worker прошла успешно:',registration);
        const permissionNotice = await Notification.requestPermission();
        // console.log('permissionNotice', permissionNotice)
        if (permissionNotice === 'granted'){  
            
            // await randomNotification();
      
            const subscr = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
          })
          // console.log('регистрация service worker pushManager:',subscr)
          const getBrowser = loadVersionBrowser();
          // console.log('browser',getBrowser);
          const params = {
            'browser': getBrowser.name.toUpperCase(), 
            'endpoint': subscr.endpoint,
            'p256dh': btoa(String.fromCharCode.apply(null, new Uint8Array(subscr.getKey('p256dh')))),
            'auth': btoa(String.fromCharCode.apply(null, new Uint8Array(subscr.getKey('auth')))),
          }
          // console.log(params)
          const createHandShakeFromBeckend = await api.profileApi.postNotificationsServiceWorker(params);
          const {result} = createHandShakeFromBeckend;
          // console.log('Рукопожатие прошло успешно админ знает про нас ',result)
        }
      }catch(e){
        console.log('Ошибка в регистрации service worker' + e.name + ":" + e.message)
        console.log(e)
      }
  }

  const randomNotification = () => {
    const notifTitle = 'Fashion Town';
    const notifBody = `После согласия Вам будут приходить уведомления и сможете воспользоваться нашим приложением`;
    const notifImg = `../public/icon-512x512.png`;
    const options = {
      body: notifBody,
      icon: notifImg,
    };
    new Notification(notifTitle, options);
    setTimeout(randomNotification, 30000);
  }
  
  
 const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription()
                      .then( subscription => {
                          if (!!subscription){
                            subscription.unsubscribe()
                            .then(function(successful) {
                              console.log('You have successfully unsubscribed');
                            })
                            .catch(err=>console.error('не удалось отписаться от бэка'))
                          }
          })
        registration.unregister()
            .then(function(successful) {
              setLocalStorage(UNREG_PUSH_v1, 'true')
              console.log('You have successfully unregister SW');
            })
            .catch(err=>console.error('не удалось отписаться от бэка'))
      });
    }
  }


  function loadVersionBrowser() {
    if ("userAgentData" in navigator) {
      // navigator.userAgentData is not available in
      // Firefox and Safari
      const uaData = navigator.userAgentData || navigator.userAgent;
      // Outputs of navigator.userAgentData.brands[n].brand are e.g.
      // Chrome: 'Google Chrome'
      // Edge: 'Microsoft Edge'
      // Opera: 'Opera'
      let browsername;
      let browserversion;
      let chromeVersion = null;
      for (var i = 0; i < uaData.brands.length; i++) {
        let brand = uaData.brands[i].brand;
        browserversion = uaData.brands[i].version;
        if (brand.match(/opera|chrome|edge|safari|firefox|msie|trident/i) !== null) {
          // If we have a chrome match, save the match, but try to find another match
          // E.g. Edge can also produce a false Chrome match.
          if (brand.match(/chrome/i) !== null) {
            chromeVersion = browserversion;
          }
          // If this is not a chrome match return immediately
          else {
            browsername = brand.substr(brand.indexOf(' ') + 1);
            return {
              name: browsername,
              version: browserversion
            }
          }
        }
      }
      // No non-Chrome match was found. If we have a chrome match, return it.
      if (chromeVersion !== null) {
        return {
          name: "chrome",
          version: chromeVersion
        }
      }
    }
    // If no userAgentData is not present, or if no match via userAgentData was found,
    // try to extract the browser name and version from userAgent
    const userAgent = navigator.userAgent;
  
    let ua = userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        return { name: 'Opera', version: tem[1] };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    return {
      name: M[0],
      version: M[1]
    };
  };


  // registration.onupdatefound = async () => {
  //   console.log('onupdatefound')
  //   const installingWorker = registration.installing;
  //   if (installingWorker == null) {
  //     return;
  //   }
  //   installingWorker.onstatechange = async () => {
  //     console.log('installingWorker.state',installingWorker.state)
  //     if (installingWorker.state === 'installed') {
  //       if (navigator.serviceWorker.controller) {
  //         const subscr = await registration.pushManager.subscribe({
  //           userVisibleOnly: true,
  //           applicationServerKey: VAPID_PUBLIC_KEY
  //         })
  //         console.log('регистрация service worker pushManager:',subscr)
  //         const getBrowser = loadVersionBrowser();
  //         console.log('browser',getBrowser);
  //         const params = {
  //           'browser': getBrowser.name.toUpperCase(), 
  //           'endpoint': subscr.endpoint,
  //           'p256dh': btoa(String.fromCharCode.apply(null, new Uint8Array(subscr.getKey('p256dh')))),
  //           'auth': btoa(String.fromCharCode.apply(null, new Uint8Array(subscr.getKey('auth')))),
  //         }
  //         console.log(params)
  //         const createHandShakeFromBeckend = await api.profileApi.postNotificationsServiceWorker(params);
  //         console.log('Рукопожатие прошло успешно админ знает про нас ',createHandShakeFromBeckend)
  //       } else {
         
  //         console.log('Content is cached for offline use.');

  //         // Execute callback
  //         if (config && config.onSuccess) {
  //           config.onSuccess(registration);
  //         }
  //       }
  //     }
  //   };
  // };