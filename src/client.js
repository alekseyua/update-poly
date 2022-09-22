import App from './App';
import { StoreContext } from 'storeon/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import initContext from '../public/content-page.json';// нужно протестить с инишенал данными и без
import { store } from './store';
import ScrollToTop from './Views/ScrollToTop';

const init_state = window.__INITIAL_DATA__;
// console.log('store', store.get())
hydrate(
  <StoreContext.Provider value={store} >
    <BrowserRouter >
      <ScrollToTop />
      <App context={init_state} initContext={store.get()} />
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
