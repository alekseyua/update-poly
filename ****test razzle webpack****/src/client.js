import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';


const serverData = window.__INITIAL_DATA__


hydrate(
  <BrowserRouter >
    <App serverData={serverData} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
