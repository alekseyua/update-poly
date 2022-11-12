import App from './App';
import { StoreContext } from 'storeon/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { store } from './store';
import ScrollToTop from './Views/ScrollToTop';
import { getCookie } from './helpers/helpers';
import * as serviceWorker from './serviceWorker';


const init_state = window.__INITIAL_DATA__;
// console.log('store', store.get())
const token = getCookie('ft_token');
hydrate(
  <StoreContext.Provider value={store} >
    <BrowserRouter >
      {/* <ScrollToTop /> */}
      <App context={init_state} initContext={store.get()} />
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

// if (!(!!token)){ 
//   console.log('start unregister sw')
//   serviceWorker.unregister();
// }else{
//   console.log('start register sw')
//   serviceWorker.register();
// }
